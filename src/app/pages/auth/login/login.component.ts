import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../../../app/core/storage/storage.service';
import { AuthService } from '../../../../app/core/services/auth.service';
import { LoginResult } from '../../../../app/core/model/loginresult.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Snackbar } from '../../../../app/core/ui/snackbar';
import { AppConfigService } from 'src/app/core/services/app-config.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error: string;
  isProcessing = false;
  isAdminUserType;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private appConfigService: AppConfigService,
    private storageService: StorageService,
    private snackBar: Snackbar) {
      this.title = this.appConfigService.config.appTitle;
      this.isAdminUserType = this.route.snapshot.data['isAdminUserType'];
      // redirect to home if already logged in

      const user = this.storageService.getLoginUser();
      if (user && user.isAdminUserType) {
          this.router.navigate(['/admin']);
      }
      else if(user && !user.isAdminUserType) {
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }
  get formData() { return this.loginForm.value; }

  onSubmit() {
    if (this.loginForm.invalid) {
        return;
    }
    if(this.isAdminUserType){
      try{
        this.isProcessing = true;
        this.authService.loginAdmin(this.formData)
          .subscribe(async res => {
            if (res.success) {
              const userData: LoginResult = res.data;
              this.storageService.saveLoginUser(userData);
              this.router.navigate(['/admin'], { replaceUrl: true });
              this.isProcessing = false;
            } else {
              this.isProcessing = false;
              this.error = Array.isArray(res.message) ? res.message[0] : res.message;
              this.snackBar.snackbarError(this.error);
            }
          }, async (err) => {
            this.isProcessing = false;
            this.error = Array.isArray(err.message) ? err.message[0] : err.message;
            this.snackBar.snackbarError(this.error);
          });
      } catch (e){
        this.isProcessing = false;
        this.error = Array.isArray(e.message) ? e.message[0] : e.message;
        this.snackBar.snackbarError(this.error);
      }
    }
    else {
      try{
        this.isProcessing = true;
        this.authService.loginClient(this.formData)
          .subscribe(async res => {
            if (res.success) {
              const userData: LoginResult = res.data;
              this.storageService.saveLoginUser(userData);
              this.router.navigate(['/'], { replaceUrl: true });
              this.isProcessing = false;
            } else {
              this.isProcessing = false;
              this.error = Array.isArray(res.message) ? res.message[0] : res.message;
              this.snackBar.snackbarError(this.error);
            }
          }, async (err) => {
            this.isProcessing = false;
            this.error = Array.isArray(err.message) ? err.message[0] : err.message;
            this.snackBar.snackbarError(this.error);
          });
      } catch (e){
        this.isProcessing = false;
        this.error = Array.isArray(e.message) ? e.message[0] : e.message;
        this.snackBar.snackbarError(this.error);
      }
    }
  }

  getError(key:string){
    return this.f[key].errors;
  }
}
