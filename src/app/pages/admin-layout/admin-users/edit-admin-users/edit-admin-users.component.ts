import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MyErrorStateMatcher } from 'src/app/core/form-validation/error-state.matcher';
import { User } from 'src/app/core/model/user.model';
import { UserService } from 'src/app/core/services/user.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { Snackbar } from 'src/app/core/ui/snackbar';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-edit-admin-users',
  templateUrl: './edit-admin-users.component.html',
  styleUrls: ['./edit-admin-users.component.scss']
})
export class EditAdminUsersComponent implements OnInit {

  currentUserId:string;
  userData: User;
  staffUserRoleIds:string[] = [];
  userForm: FormGroup;
  mediaWatcher: Subscription;
  matcher = new MyErrorStateMatcher();
  isLoading = false;
  isProcessing = false;
  error;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: Snackbar,
    private storageService: StorageService,
    private readonly changeDetectorRef: ChangeDetectorRef
    ) {
      this.currentUserId = this.storageService.getLoginUser().userId;
      const userId = this.route.snapshot.paramMap.get("userId");
      if(this.currentUserId === userId){
        this.snackBar.snackbarError("Invalid user, Cannot edit this user!");
        this.router.navigate(['admin/admin-users/']);
      }
      this.userForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        middleName: [''],
        lastName: ['', Validators.required],
        genderId: ['', Validators.required],
        birthDate: [new Date(), Validators.required],
        mobileNumber: ['',
            [Validators.minLength(11),Validators.maxLength(11), Validators.pattern("^[0-9]*$"), Validators.required]],
        address: ['', Validators.required],
      });
      this.initUser(userId);
  }

  ngOnInit(): void {

  }

  async initUser(userId:string){
    this.isLoading = true;
    this.isProcessing = true;
    try{
      await this.userService.getById(userId)
      .subscribe(async res => {
        if (res.success) {
          this.userData = res.data;
          this.userForm.controls['firstName'].setValue(res.data.firstName);
          this.userForm.controls['middleName'].setValue(res.data.middleName);
          this.userForm.controls['lastName'].setValue(res.data.lastName);
          this.userForm.controls['genderId'].setValue(res.data.gender.genderId);
          this.userForm.controls['birthDate'].setValue(res.data.birthDate);
          this.userForm.controls['mobileNumber'].setValue(res.data.mobileNumber);
          this.userForm.controls['address'].setValue(res.data.address);
          this.isLoading = false;
          this.isProcessing = false;
        } else {
          this.isLoading = false;
          this.isProcessing = false;
          this.error = Array.isArray(res.message) ? res.message[0] : res.message;
          this.snackBar.snackbarError(this.error);
          if(this.error.toLowerCase().includes("not found")){
            this.router.navigate(['admin/admin-users/']);
          }
        }
      }, async (err) => {
        this.isLoading = false;
        this.isProcessing = false;
        this.error = Array.isArray(err.message) ? err.message[0] : err.message;
        this.snackBar.snackbarError(this.error);
        if(this.error.toLowerCase().includes("not found")){
          this.router.navigate(['admin/admin-users/']);
        }
      });
    }
    catch(e){
      this.isLoading = false;
      this.isProcessing = false;
      this.error = Array.isArray(e.message) ? e.message[0] : e.message;
      this.snackBar.snackbarError(this.error);
      if(this.error.toLowerCase().includes("not found")){
        this.router.navigate(['admin/admin-users/']);
      }
    }
  }

  get f() { return this.userForm.controls; }
  get formIsValid() { return this.userForm.valid }
  get formData() { return { ...this.userForm.value, userId: this.userData.userId }  }

  async onSubmit(){
    if (this.userForm.invalid) {
        return;
    }

    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Save role?';
    dialogData.confirmButton = {
      visible: true,
      text: 'yes',
      color:'primary'
    }
    dialogData.dismissButton = {
      visible: true,
      text: 'cancel'
    }
    const dialogRef = this.dialog.open(AlertDialogComponent, {
        maxWidth: '400px',
        closeOnNavigation: true
    })
    dialogRef.componentInstance.alertDialogConfig = dialogData;

    dialogRef.componentInstance.conFirm.subscribe(async (data: any) => {
      this.isProcessing = true;
      dialogRef.componentInstance.isProcessing = this.isProcessing;
      try{
        this.isProcessing = true;
        const userData = this.formData;
        await this.userService.update(userData)
          .subscribe(async res => {
            if (res.success) {
              this.snackBar.snackbarSuccess('Saved!');
              this.router.navigate(['admin/admin-users/']);
              this.isProcessing = false;
              dialogRef.componentInstance.isProcessing = this.isProcessing;
              dialogRef.close();
            } else {
              this.isProcessing = false;
              dialogRef.componentInstance.isProcessing = this.isProcessing;
              this.error = Array.isArray(res.message) ? res.message[0] : res.message;
              this.snackBar.snackbarError(this.error);
              dialogRef.close();
            }
          }, async (err) => {
            this.isProcessing = false;
            dialogRef.componentInstance.isProcessing = this.isProcessing;
            this.error = Array.isArray(err.message) ? err.message[0] : err.message;
            this.snackBar.snackbarError(this.error);
            dialogRef.close();
          });
      } catch (e){
        this.isProcessing = false;
        dialogRef.componentInstance.isProcessing = this.isProcessing;
        this.error = Array.isArray(e.message) ? e.message[0] : e.message;
        this.snackBar.snackbarError(this.error);
        dialogRef.close();
      }
    });
  }
  getError(key:string){
    return this.f[key].errors;
  }
}

