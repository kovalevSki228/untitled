import { CategoryDetailsComponent } from './admin/category-details/category-details.component';
import { TicketDetailsComponent } from './home/ticket-group/ticket-details/ticket-details.component';

import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'untitled';

  constructor(
    private modalService: NgbModal,
    public router: Router) {}

  createTicketForm(): void {
    const modalRef = this.modalService.open(TicketDetailsComponent).result.then();
  }

  createCategoryForm(): void {
    const modalRef = this.modalService.open(CategoryDetailsComponent).result.then();
  }
}
