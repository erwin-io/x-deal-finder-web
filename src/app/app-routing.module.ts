import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuardGuard } from './core/guard/admin-guard.guard';

import { AuthGuard } from './core/guard/auth.guard';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './pages/client-layout/client-layout.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'admin', pathMatch: 'full', redirectTo: 'admin/dashboard' },
    { path: '',
      component: ClientLayoutComponent,
      canActivate: [AuthGuard],
      children: [
        { path: 'home', canActivate: [AuthGuard], loadChildren: () => import('./pages/client-layout/home/home.module').then(m => m.HomeModule) },
        { path: 'today', canActivate: [AuthGuard], loadChildren: () => import('./pages/client-layout/deals-today/deals-today.module').then(m => m.DealsTodayModule) },
      ]
    },
    { path: 'admin',
      component: AdminLayoutComponent,
      canActivate: [AdminGuardGuard],
      children: [
        { path: 'dashboard', canActivate: [AdminGuardGuard], loadChildren: () => import('./pages/admin-layout/dashboard/dashboard.module').then(m => m.DashboardModule) },
        { path: 'client-stores', canActivate: [AdminGuardGuard], loadChildren: () => import('./pages/admin-layout/client-stores/client-stores.module').then(m => m.ClientStoresModule) },
        { path: 'admin-users', canActivate: [AdminGuardGuard], loadChildren: () => import('./pages/admin-layout/admin-users/admin-users.module').then(m => m.AdminUsersModule) },
        { path: 'clients', canActivate: [AdminGuardGuard], loadChildren: () => import('./pages/admin-layout/client-users/client-users.module').then(m => m.ClientUsersModule) },
      ]
    },
    { path: 'account',
      loadChildren:  () => import('./pages/accounts/accounts.module').then( m => m.AccountsModule) ,
      canActivate: [AuthGuard]
    },
    { path: 'admin/account',
      loadChildren:  () => import('./pages/accounts/accounts.module').then( m => m.AccountsModule) ,
      canActivate: [AdminGuardGuard]
    },
    { path: 'auth',
      loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthModule)
    },
    { path: 'admin/auth',
      loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthModule),
      data: { isAdminUserType: true }
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
