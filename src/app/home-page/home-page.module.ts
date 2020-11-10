import { HomePageComponent } from './home-page.component';
import { CategoryComponent } from './category/category.component';
import { NgModule } from "@angular/core";
import { SharedModule } from '../shared/shared.modul';
import { TicketComponent } from './category/ticket/ticket.component';

@NgModule({
    declarations:[
        CategoryComponent,
        HomePageComponent,
        TicketComponent
    ],
    imports: [
        SharedModule
    ]
})

export class HomePageModule {}