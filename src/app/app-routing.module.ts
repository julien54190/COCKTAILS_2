import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './_utils/error/error.component';
import { authGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./public/public.module') // sert a appeler le module seulement quand il est demander qui evite de le charger s'il en a pas besoin
      .then(m => m.PublicModule)
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module')
    .then(m => m.AdminModule), canActivate:[authGuard]
  },
  {
    path:'auth', loadChildren: () => import('./auth/auth.module')
    .then(m => m.AuthModule)
  },

  { path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
