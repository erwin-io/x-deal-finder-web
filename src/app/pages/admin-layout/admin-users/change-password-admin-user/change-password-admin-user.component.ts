import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
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
  selector: 'app-change-password-admin-user',
  templateUrl: './change-password-admin-user.component.html',
  styleUrls: ['./change-password-admin-user.component.scss']
})
export class ChangePasswordAdminUserComponent implements OnInit {

  currentUserId:string;
  userData: User = {} as any;
  staffUserRoleIds:string[] = [];
  changePasswordForm: FormGroup;
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
      this.userData.userId = userId;
      if(this.currentUserId === userId){
        this.snackBar.snackbarError("Invalid user, Cannot edit this user!");
        this.router.navigate(['admin/admin-users/']);
      }
      this.changePasswordForm = this.formBuilder.group({
        password: ['', Validators.required],
        confirmPassword : '',
      }, { validators: this.checkPasswords });
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  };

  ngOnInit(): void {

  }

  get f() { return this.changePasswordForm.controls; }
  get formIsValid() { return this.changePasswordForm.valid }
  get formData() { return { ...this.changePasswordForm.value, userId: this.userData.userId }  }

  async onSubmit(){
    if (this.changePasswordForm.invalid) {
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
        const data = this.formData;
        await this.userService.updatePassword(data)
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
    let error:any = null;
    if(key === 'confirmPassword' && this.f[key]?.touched && this.formData.password !== this.formData.confirmPassword){
      this.f[key].setErrors({notMatched: true})
    }
    error = this.f[key].errors
    return error;
  }
}

