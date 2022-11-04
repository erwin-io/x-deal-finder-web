import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './admin-users.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { EditAdminUsersComponent } from './edit-admin-users/edit-admin-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordAdminUserComponent } from './change-password-admin-user/change-password-admin-user.component';

export const routes: Routes = [
  {
    path: '',
    component: AdminUsersComponent,
    pathMatch: 'full'
  },
  {
    path: 'edit/:userId',
    component: EditAdminUsersComponent
  },
  {
    path: 'change-password-admin-user/:userId',
    component: ChangePasswordAdminUserComponent
  }
];


@NgModule({
  declarations: [AdminUsersComponent, EditAdminUsersComponent, ChangePasswordAdminUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminUsersModule { }
