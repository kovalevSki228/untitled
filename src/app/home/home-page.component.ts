import { Ticket } from 'src/app/shared/shared.model';
import { Category } from './../shared/shared.model';
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/services/backend.services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  public categories: Category[];

  constructor(public backendService: BackendService) { }

  ngOnInit(): void {
    this.fetchTicket();
  }

  fetchTicket(): void {
    this.backendService.fetchCategories()
      .subscribe(ticketGroup => this.categories = ticketGroup );
  }

  onTicketAdded(ticket: Ticket): void {
    this.backendService.addTicket(ticket).subscribe(() => this.fetchTicket());
    console.log(ticket);
  }
}
