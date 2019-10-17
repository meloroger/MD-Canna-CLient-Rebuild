import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './layouts/main/main.component';
import { HomeComponent } from './content/home/home.component';
import { RegisterComponent } from './content/register/register.component';
import { LoginComponent } from './content/login/login.component';
import { ProfileComponent } from './content/profile/profile.component';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { OrderListComponent } from './content/order-list/order-list.component';
import { EmployeeListComponent } from './content/employee-list/employee-list.component';
import { ItemListComponent } from './content/item-list/item-list.component';
import { StockListComponent } from './content/stock-list/stock-list.component';
import { LiveFeedComponent } from './content/live-feed/live-feed.component';
import { AccessComponent } from './layouts/access/access.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  },
  {
    path: 'welcome',
    component: AccessComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'orders',
        component: OrderListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'employees',
        component: EmployeeListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'items',
        component: ItemListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'stock',
        component: StockListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'live-feed',
        component: LiveFeedComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
