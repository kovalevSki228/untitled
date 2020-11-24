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

  public showCategoryForm(): void {
    this.modalService.open(CategoryFormComponent, { centered: true });
  }

  public atHomePage(): boolean {
    return this.router.url === '/';
  }
}
