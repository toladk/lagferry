import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../views/core-modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
        data: { title: 'Dashboard' },
      },
      {
        path: 'users',
        loadChildren: () =>
          import('../views/core-modules/users/users.module').then(
            (m) => m.UsersModule
          ),
      },
      {
        path: 'crew-members',
        loadChildren: () =>
          import('../views/core-modules/crew-members/crew-members.module').then(
            (m) => m.CrewMembersModule
          ),
      },
      {
        path: 'boats',
        loadChildren: () =>
          import('../views/core-modules/boats/boats.module').then(
            (m) => m.BoatsModule
          ),
      },
      {
        path: 'schedule',
        loadChildren: () =>
          import('../views/core-modules/terminal/terminal.module').then(
            (m) => m.TerminalModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('../views/core-modules/reports/reports.module').then(
            (m) => m.ReportsModule
          ),
      },
      {
        path: 'routes',
        loadChildren: () =>
          import('../views/core-modules/routes/routes.module').then(
            (m) => m.RoutesModule
          ),
      },
      {
        path: 'networks',
        loadChildren: () =>
          import('../views/core-modules/networks/networks.module').then(
            (m) => m.NetworksModule
          ),
      },
      {
        path: 'monitor',
        loadChildren: () =>
          import('../views/core-modules/monitor/monitor.module').then(
            (m) => m.MonitorModule
          ),
      },
      // {
      //   path: 'feedback',
      //   loadChildren: () =>
      //     import('../views/core-modules/feedback/feedback.module').then(
      //       (m) => m.FeedbackModule
      //     ),
      // },
      {
        path: 'map',
        loadChildren: () =>
          import('../views/core-modules/map/map.module').then(
            (m) => m.MapModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
