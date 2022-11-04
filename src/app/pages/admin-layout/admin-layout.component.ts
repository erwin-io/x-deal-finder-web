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
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnDestroy {
  title;
  opened: boolean = true;
  mediaWatcher: Subscription;
  menu = [
    {
      displayName: 'Dashboard',
      iconName: 'dashboard',
      route: 'admin/dashboard',
      isParent: false,
    },
    {
      displayName: 'Stores',
      iconName: 'store',
      route: 'admin/client-stores',
      isParent: false,
    },
    {
      displayName: 'Admin Users',
      iconName: 'supervised_user_circle',
      route: 'admin/admin-users',
      isParent: false,
    },
    {
      displayName: 'Clients',
      iconName: 'contacts',
      route: 'admin/clients',
      isParent: false,
    },
    {
      displayName: 'Account settings',
      iconName: 'account_circle',
      route: 'admin/account',
      isParent: false,
    }
  ];
  signOutMenuItem = {
      displayName: 'Sign Out',
      iconName: 'exit_to_app'
  } as NavItem;

  constructor(private media: MediaObserver,
    private authService: AuthService,
    private dialog: MatDialog,
    public router: Router,
    private appConfigService: AppConfigService,
    private storageService: StorageService) {
      this.title = this.appConfigService.config.appTitle;
      this.initMenu();
      this.mediaWatcher = this.media.asObservable().subscribe((change) => {
        change.forEach(() => {
          this.handleMediaChange();
        });
      })

  }

  initMenu(){
    const user = this.storageService.getLoginUser();
    if(!user){
      this.storageService.saveLoginUser(null);
      this.router.navigate(['admin/auth/login'], { replaceUrl: true });
    }
  }

  private handleMediaChange() {
      if (this.media.isActive('lt-md')) {
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
      this.router.navigate(['admin/auth/login'], { replaceUrl: true });
      dialogRef.close();
  });
    // dialogRef.afterClosed().subscribe(dialogResult => {
    //   if (dialogResult) {
    //     }
    // });
  }
  ngOnDestroy() {
      this.mediaWatcher.unsubscribe();
  }
}
