import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangeUsernameComponent } from './change-username/change-username.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


export const routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      breadcrumb: 'Profile'
    }
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    data: {
      breadcrumb: 'Edit profile'
    }
  },
  {
    path: 'change-username',
    component: ChangeUsernameComponent,
    data: {
      breadcrumb: 'Change username'
    }
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    data: {
      breadcrumb: 'Change password'
    }
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ]
})

export class AccountsModule { }
