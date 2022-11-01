import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientUsersComponent } from './client-users.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';


export const routes: Routes = [
  {
    path: '',
    component: ClientUsersComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [ClientUsersComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientUsersModule { }
