import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertDialogModel } from './alert-dialog-model';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {
  isProcessing = false;
  alertDialogConfig:AlertDialogModel;
  conFirm = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>) {
    dialogRef.disableClose = true;
  }

  onConfirm(): void {
    this.conFirm.emit(true);
  }

  onDismiss(): void {
    this.dialogRef.close();
  }

}
