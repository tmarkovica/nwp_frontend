import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BankAccountsComponent } from './modules/bank-accounts/bank-accounts.component';
import { HomeComponent } from './modules/home/home.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { AuthGuard } from './modules/shared/guards/auth/auth.guard';

const routes: Routes = [
  { path: '*', redirectTo: '', pathMatch: 'full'  },
  {
    path: '',
    component: HomeComponent,
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'news',
    loadChildren: () =>
      import('./modules/news/news.module').then((m) => m.NewsModule),
    canActivate: [AuthGuard]
  },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'bank-accounts', component: BankAccountsComponent, canActivate: [AuthGuard] },
  // { path: '**', component: Page404 } // Wild card route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
