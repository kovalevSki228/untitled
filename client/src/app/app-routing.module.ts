import { AuthGuard } from './shared/services/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home/home-page.component';
import { AdminPageComponent } from './admin/admin-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
    { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
