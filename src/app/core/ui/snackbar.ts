import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class Snackbar {
  constructor(
    private snackBar: MatSnackBar){

  }
  private configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
  };

  private configError: MatSnackBarConfig = {
    panelClass: ['style-error'],
  };

  public snackbarSuccess(message) {
    this.snackBar.open(message, 'close', this.configSuccess);
  }

  public snackbarError(message) {
    this.snackBar.open(message, 'close', this.configError);
  }
}
