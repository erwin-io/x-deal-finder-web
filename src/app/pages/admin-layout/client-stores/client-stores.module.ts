import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientStoresComponent } from './client-stores.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';


export const routes: Routes = [
  {
    path: '',
    component: ClientStoresComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [ClientStoresComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientStoresModule { }
