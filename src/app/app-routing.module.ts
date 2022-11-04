import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuardGuard } from './core/guard/admin-guard.guard';

import { AuthGuard } from './core/guard/auth.guard';
import { AccountsLayoutComponent } from './pages/accounts-layout/accounts-layout.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './pages/client-layout/client-layout.component';
import { AppConfigService } from './core/services/app-config.service';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'admin', pathMatch: 'full', redirectTo: 'admin/dashboard' },
    { path: 'account', pathMatch: 'full', redirectTo: 'account/profile-settings' },
    { path: 'admin/account', pathMatch: 'full', redirectTo: 'admin/account/profile-settings' },
    { path: '',
      component: ClientLayoutComponent,
      canActivate: [AuthGuard],
      children: [
        { path: 'home', canActivate: [AuthGuard], loadChildren: () => import('./pages/client-layout/home/home.module').then(m => m.HomeModule), data: { title: 'Home page' } },
        { path: 'today', canActivate: [AuthGuard], loadChildren: () => import('./pages/client-layout/deals-today/deals-today.module').then(m => m.DealsTodayModule), data: { title: 'Deals for today' } },
      ]
    },
    { path: 'account',
      component: AccountsLayoutComponent,
      canActivate: [AuthGuard],
      children: [
        { path: 'profile-settings', canActivate: [AuthGuard], loadChildren: () => import('./pages/accounts-layout/profile/profile.module').then(m => m.ProfileModule), data: { title: 'Profile settings' } },
        { path: 'edit-profile', canActivate: [AuthGuard], loadChildren: () => import('./pages/accounts-layout/edit-profile/edit-profile.module').then(m => m.EditProfileModule), data: { title: 'Edit profile' } },
        { path: 'change-username', canActivate: [AuthGuard], loadChildren: () => import('./pages/accounts-layout/change-username/change-username.module').then(m => m.ChangeUsernameModule), data: { title: 'Change username' } },
        { path: 'change-password', canActivate: [AuthGuard], loadChildren: () => import('./pages/accounts-layout/change-password/change-password.module').then(m => m.ChangePasswordModule), data: { title: 'Change password' } },
      ]
    },
    { path: 'admin',
      component: AdminLayoutComponent,
      canActivate: [AdminGuardGuard],
      children: [
        { path: 'dashboard', canActivate: [AdminGuardGuard], loadChildren: () => import('./pages/admin-layout/dashboard/dashboard.module').then(m => m.DashboardModule), data: { title: 'Dsashboard' } },
        { path: 'client-stores', canActivate: [AdminGuardGuard], loadChildren: () => import('./pages/admin-layout/client-stores/client-stores.module').then(m => m.ClientStoresModule), data: { title: 'Client stores' } },
        { path: 'admin-users', canActivate: [AdminGuardGuard], loadChildren: () => import('./pages/admin-layout/admin-users/admin-users.module').then(m => m.AdminUsersModule), data: { title: 'Admin users' } },
        { path: 'clients', canActivate: [AdminGuardGuard], loadChildren: () => import('./pages/admin-layout/client-users/client-users.module').then(m => m.ClientUsersModule), data: { title: 'Client users' } },
      ]
    },
    { path: 'admin/account',
      component: AccountsLayoutComponent,
      canActivate: [AdminGuardGuard],
      data: { isAdminUserType: true },
      children: [
        { path: 'profile-settings', canActivate: [AdminGuardGuard], loadChildren: () => import('./pages/accounts-layout/profile/profile.module').then(m => m.ProfileModule), data: { title: 'Profile settings' } },
        { path: 'edit-profile', canActivate: [AdminGuardGuard], loadChildren: () => import('./pages/accounts-layout/edit-profile/edit-profile.module').then(m => m.EditProfileModule), data: { title: 'Edit profile' } },
        { path: 'change-username', canActivate: [AdminGuardGuard], loadChildren: () => import('./pages/accounts-layout/change-username/change-username.module').then(m => m.ChangeUsernameModule), data: { title: 'Change username' } },
        { path: 'change-password', canActivate: [AdminGuardGuard], loadChildren: () => import('./pages/accounts-layout/change-password/change-password.module').then(m => m.ChangePasswordModule), data: { title: 'Change password' } },
      ]
    },
    { path: 'auth',
      loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthModule)
    },
    { path: 'admin/auth',
      loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthModule),
      data: {
        isAdminUserType: true
      }
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
