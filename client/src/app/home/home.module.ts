import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TicketDetailsComponent } from './ticket-group/ticket-details/ticket-details.component';
import { HomePageComponent } from './home-page.component';
import { TicketGroupComponent } from './ticket-group/ticket-group.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TicketPreviewComponent } from './ticket-group/ticket-preview/ticket-preview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChipsModule } from 'primeng/chips';
import { InlineSVGModule } from 'ng-inline-svg';
import { DragulaModule } from 'ng2-dragula';
import { CommentGroupComponent } from './ticket-group/ticket-details/comment-group/comment-group.component';
import { CommentComponent } from './ticket-group/ticket-details/comment-group/comment/comment.component';

@NgModule({
    declarations: [
        TicketGroupComponent,
        HomePageComponent,
        TicketPreviewComponent,
        TicketDetailsComponent,
        CommentComponent,
        CommentGroupComponent
    ],
    imports: [
        SharedModule,
        ChipsModule,
        NgbModule,
        DragulaModule.forRoot(),
        InlineSVGModule.forRoot()
    ]
})

export class HomeModule { }
