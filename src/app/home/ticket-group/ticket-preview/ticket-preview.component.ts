import { TicketPreview, Category } from './../../../shared/shared.model';
import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from 'src/app/shared/shared.model';

@Component({
  selector: 'app-ticket-preview',
  templateUrl: './ticket-preview.component.html',
  styleUrls: ['./ticket-preview.component.scss']
})
export class TicketPreviewComponent implements OnInit {
  @Input() ticket: TicketPreview;
  constructor() { }

  ngOnInit(): void { }

}
