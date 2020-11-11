import { HomePageComponent } from './home/home-page.component';
import { AdminPageComponent } from './admin/admin-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'admin', component: AdminPageComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}