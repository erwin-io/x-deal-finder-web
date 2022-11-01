import { Component, Directive, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { Snackbar } from '../../../../app/core/ui/snackbar';
import { AuthService } from '../../../../app/core/services/auth.service';
import { MyErrorStateMatcher } from '../../../core/form-validation/error-state.matcher';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConfigService } from 'src/app/core/services/app-config.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  title;
  formCreateAccount: FormGroup;
  formContact: FormGroup;
  formPersonalInfo: FormGroup;
  isLinear = false;
  mediaWatcher: Subscription;
  stepperOrientation;
  matcher = new MyErrorStateMatcher();
  @ViewChildren(MatInput) formInput : QueryList<MatInput>;
  @ViewChild('stepper', { static: false}) stepper : MatStepper;
  isProcessing = false;
  isSuccessful = false;
  error;
  isAdminUserType;

  constructor(
    private _formBuilder: FormBuilder,
    private media: MediaObserver,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private appConfigService: AppConfigService,
    private snackBar: Snackbar
    ) {
      this.title = this.appConfigService.config.appTitle;
      this.isAdminUserType = this.route.snapshot.data['isAdminUserType'];
      this.mediaWatcher = this.media.asObservable().subscribe((change) => {
        change.forEach((item) => {
          this.handleMediaChange(item);
        });
      })
  }
  ngOnInit(): void {
    this.formCreateAccount = this._formBuilder.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword : '',
    }, { validators: this.checkPasswords });

    this.formContact = this._formBuilder.group({
      email: ['',
      Validators.compose(
          [Validators.email, Validators.required])],
      mobileNumber: ['',
      Validators.compose(
          [Validators.minLength(11),Validators.maxLength(11), Validators.required])],
    });


    this.formPersonalInfo = this._formBuilder.group({
      address: ['', Validators.required],
      birthDate: ['', Validators.required],
      genderId: ['', Validators.required],
    });

  }
  ngAfterViewInit(): void{
    setTimeout(()=>{
      this.formInput.filter(x=>x.ngControl.name === 'firstName')[0].focus();
    }, 500);
  }

  get formData() { return Object.assign({}, this.formCreateAccount.value, this.formContact.value,  this.formPersonalInfo.value) }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  };

  onSubmitFormCreateAccount(){
    const params = this.formData;
    if(!this.formCreateAccount.valid){
      return;
    }
    try {
      this.isProcessing = true;
      this.authService.findByUsername(params.username)
      .subscribe(async res => {
        if (res.success) {
          if(res.data ===null || res.data === undefined){
            this.stepper.selectedIndex = 1;
          }else{
            this.formCreateAccount.controls['username'].setErrors({notAvailable: true});
          }
          this.isProcessing = false;
        } else {
          this.isProcessing = false;
          this.isSuccessful = false;
          this.error = Array.isArray(res.message) ? res.message[0] : res.message, 'ok';
          this.snackBar.snackbarError(this.error);
        }
      }, async (err) => {
        this.isProcessing = false;
        this.error = Array.isArray(err.message) ? err.message[0] : err.message, 'ok';
        this.snackBar.snackbarError(this.error);
      });
    }
    catch (e){
      this.isProcessing = false;
      this.error = Array.isArray(e.message) ? e.message[0] : e.message, 'ok';
      this.snackBar.snackbarError(this.error);
    }
  }

  onSubmit(){
    if(!this.formCreateAccount.valid || !this.formContact.valid || !this.formPersonalInfo.valid){
      return;
    }
    if(this.isAdminUserType){
      this.registerAdminUser();
    }
    else {
      this.registerClientUser();
    }
  }

  registerAdminUser(){
    try{
      this.isProcessing = true;
      this.stepper.animationDuration = '0s';
      this.stepper.selectedIndex = 3;
      this.authService.registerAdmin(this.formData)
      .subscribe(async res => {
        if (res.success) {
          this.isProcessing = false;
          this.isSuccessful = true;
        } else {
          this.isProcessing = false;
          this.isSuccessful = false;
          this.stepper.selectedIndex = 2;
          this.error = Array.isArray(res.message) ? res.message[0] : res.message, 'ok';
          this.snackBar.snackbarError(this.error);
        }
      }, async (err) => {
        this.isProcessing = false;
        this.isSuccessful = false;
        this.stepper.selectedIndex = 2;
        this.error = Array.isArray(err.message) ? err.message[0] : err.message, 'ok';
        this.snackBar.snackbarError(this.error);
      });
    } catch (e){
      this.isProcessing = false;
      this.isSuccessful = false;
      this.error = Array.isArray(e.message) ? e.message[0] : e.message, 'ok';
      this.snackBar.snackbarError(this.error);
    }
  }

  registerClientUser(){
    try{
      this.isProcessing = true;
      this.stepper.animationDuration = '0s';
      this.stepper.selectedIndex = 3;
      this.authService.registerClient(this.formData)
      .subscribe(async res => {
        if (res.success) {
          this.isProcessing = false;
          this.isSuccessful = true;
        } else {
          this.isProcessing = false;
          this.isSuccessful = false;
          this.stepper.selectedIndex = 2;
          this.error = Array.isArray(res.message) ? res.message[0] : res.message, 'ok';
          this.snackBar.snackbarError(this.error);
        }
      }, async (err) => {
        this.isProcessing = false;
        this.isSuccessful = false;
        this.stepper.selectedIndex = 2;
        this.error = Array.isArray(err.message) ? err.message[0] : err.message, 'ok';
        this.snackBar.snackbarError(this.error);
      });
    } catch (e){
      this.isProcessing = false;
      this.isSuccessful = false;
      this.error = Array.isArray(e.message) ? e.message[0] : e.message, 'ok';
      this.snackBar.snackbarError(this.error);
    }
  }

  private handleMediaChange(mediaChange: MediaChange) {
    if (this.media.isActive('lt-md')) {
      this.stepperOrientation = 'vertical';
    } else {
      this.stepperOrientation = 'horizontal';
    }
  }

  getError(form: any, key:string){
    let error:any = null;
    if(key === 'confirmPassword' && form.controls['confirmPassword']?.touched && this.formData.password !== this.formData.confirmPassword){
      form.controls['confirmPassword'].setErrors({notMatched: true})
    }
    error = form.controls[key].errors
    return error;
  }
  onStepChange(event){
    if(event.selectedIndex === 0) {
      setTimeout(()=>{
        this.formInput.filter(x=>x.ngControl.name === 'firstName')[0].focus();
      }, 500);
    }else if(event.selectedIndex === 1){
      setTimeout(()=>{
        this.formInput.filter(x=>x.ngControl.name === 'email')[0].focus();
      }, 500);
    }else if(event.selectedIndex === 2){
      setTimeout(()=>{
        this.formInput.filter(x=>x.ngControl.name === 'address')[0].focus();
      }, 500);
    }
  }
}
