import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './core/views/outer-modules/forgot-password/forgot-password.component';
import { LoginComponent } from './core/views/outer-modules/login/login.component';
import { AuthGuard } from './helpers/guards/auth.guard';
import { RedirectOnAuthGuard } from './helpers/guards/redirect-on-auth.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   component: homeComponent,
  //   data: {
  //     title: 'Lag Ferry Home Page',
  //   },
  // },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectOnAuthGuard],
    data: {
      title: 'Login Page',
    },
  },

  {
    path: 'forgot-password',
    canActivate: [RedirectOnAuthGuard],
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot Password Page',
    },
  },

  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./core/main/main.module').then((m) => m.MainModule),
    // canActivate: [AuthGuard]
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
