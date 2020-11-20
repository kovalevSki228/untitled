import { CategoryFormComponent } from './admin/category-form/category-form.component';
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
  constructor(
    private modalService: NgbModal,
    public router: Router) { }

  public showTicketForm(): void {
    const modalRef = this.modalService.open(TicketDetailsComponent, { centered: true, scrollable: true }).result;
  }

  public showCategoryForm(): void {
    const modalRef = this.modalService.open(CategoryFormComponent, { centered: true }).result;
  }

  public atHomePage(): boolean {
    return this.router.url === '/';
  }
}
