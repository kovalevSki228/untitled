import { TicketPreview } from './../shared/shared.model';
import { Component, OnInit } from '@angular/core';
import { BackendServices } from '../shared/services/backend.services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  public ticketGroup: TicketPreview[];

  constructor(public backendService: BackendServices) { }

  ngOnInit(): void {
    this.backendService.fetchTicketGroups()
      .subscribe(ticketGroup => this.ticketGroup = ticketGroup );
      console.log(this.ticketGroup);
  }

  click(){
    console.log(this.backendService);
  }
}
