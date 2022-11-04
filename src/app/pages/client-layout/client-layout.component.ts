import { Component, OnDestroy } from '@angular/core';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/storage/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../../shared/alert-dialog/alert-dialog.component';
import { AlertDialogModel } from '../../shared/alert-dialog/alert-dialog-model';
import { NavItem } from 'src/app/core/model/nav-item';
import { AppConfigService } from 'src/app/core/services/app-config.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent implements OnDestroy {
  title;
  opened: boolean = true;
  mediaWatcher: Subscription;
  signOutMenuItem = {
      displayName: 'Sign Out',
      iconName: 'exit_to_app'
  } as NavItem;

  constructor(private media: MediaObserver,
    private authService: AuthService,
    private dialog: MatDialog,
    public router: Router,
    public appConfigService: AppConfigService,
    private storageService: StorageService) {
      this.title = this.appConfigService.config.appTitle;
      const user = this.storageService.getLoginUser();
      if(!user){
        this.storageService.saveLoginUser(null);
        this.router.navigate(['auth/login'], { replaceUrl: true });
      }
      this.mediaWatcher = this.media.asObservable().subscribe((change) => {
        change.forEach(() => {
          this.handleMediaChange();
        });
      })


  }

  private handleMediaChange() {
      if (this.media.isActive('lt-sm')) {
          this.opened = false;
      } else {
          this.opened = true;
      }
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
  ngOnDestroy() {
      this.mediaWatcher.unsubscribe();
  }
}
