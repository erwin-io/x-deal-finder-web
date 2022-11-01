import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealsTodayComponent } from './deals-today.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';

export const routes: Routes = [
  {
    path: '',
    component: DealsTodayComponent,
    pathMatch: 'full'
  }
];



@NgModule({
  declarations: [DealsTodayComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class DealsTodayModule { }
