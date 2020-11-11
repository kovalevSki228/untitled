import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-group',
  templateUrl: './ticket-group.component.html',
  styleUrls: ['./ticket-group.component.css']
})
export class TicketGroupComponent implements OnInit {
  arr = [1, 2, 3, 4];

  constructor() { }

  ngOnInit(): void {
  }
}
