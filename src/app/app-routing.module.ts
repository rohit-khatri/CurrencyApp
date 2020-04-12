import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListComponent } from './exchange/list/list.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'exchange/list', component: ListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
