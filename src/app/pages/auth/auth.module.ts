import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { LoginModule } from './login/login.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login',
    }
  },
  {
    path: 'signup',
    component: RegisterComponent,
    data: {
      title: 'Login',
    }
  }

];


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    LoginModule,
    RegisterModule,
    RouterModule.forChild(routes)
  ],
})

export class AuthModule { }
