import { TicketDetailsComponent } from './ticket-group/ticket-details/ticket-details.component';
import { HomePageComponent } from './home-page.component';
import { TicketGroupComponent } from './ticket-group/ticket-group.component';
import { NgModule } from "@angular/core";
import { SharedModule } from '../shared/shared.module';
import { TicketPreviewComponent } from './ticket-group/ticket-preview/ticket-preview.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations:[
        TicketGroupComponent,
        HomePageComponent,
        TicketPreviewComponent,
        TicketDetailsComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule
    ]
})

export class HomeModule {}
