import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/core/storage/storage.service';
import { AlertDialogModel } from 'src/app/shared/alert-dialog/alert-dialog-model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-accounts-layout',
  templateUrl: './accounts-layout.component.html',
  styleUrls: ['./accounts-layout.component.scss']
})
export class AccountsLayoutComponent implements OnInit {
  isAdminUserType = false;
  constructor(
    public router: Router,
    private dialog: MatDialog,
    private storageService: StorageService,
    private route: ActivatedRoute) {
    this.isAdminUserType = this.route.snapshot.data['isAdminUserType'];
   }

  ngOnInit(): void {
  }

  handleSignOut() {
    const dialogData = new AlertDialogModel();
    dialogData.title = 'Confirm';
    dialogData.message = 'Are you sure you want to logout?';
    dialogData.confirmButton = {
      visible: true,
      text: 'yes',
      color:'primary'
    }
    dialogData.dismissButton = {
      visible: true,
      text: 'cancel'
    }
    const dialogRef = this.dialog.open(AlertDialogComponent, {
        maxWidth: '400px',
        closeOnNavigation: true
    })

    dialogRef.componentInstance.alertDialogConfig = dialogData;
    dialogRef.componentInstance.conFirm.subscribe((data: any) => {
      this.storageService.saveLoginUser(null);
      this.router.navigate(['auth/login'], { replaceUrl: true });
      dialogRef.close();
    });
  }

}
