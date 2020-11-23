import { TicketBoardService } from '../shared/services/ticket-board.service';
import { Category, Ticket } from './../shared/shared.model';
import { Component, OnInit } from '@angular/core';
import { BackendService } from '../shared/services/backend.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public categories: Category[];

  constructor(
    private ticketBoardService: TicketBoardService) { }

  public ngOnInit(): void {
    this.ticketBoardService.categories.subscribe(categories => this.categories = categories);
    this.ticketBoardService.fetchCategories();
    this.ticketBoardService.fetchTickets();
  }

  public identify(index, item): number {
    return item.id;
  }
}