import { UserService } from '../../../shared/services/user.service';
import { TicketBoardService } from '../../../shared/services/ticket-board.service';
import { Category, Ticket, Comment } from './../../../shared/shared.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryDataService } from 'src/app/shared/services/category-data.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  @Input() public ticket: Ticket;
  @Output() public ticketAdded = new EventEmitter<Ticket>();

  public categories: Category[];
  public ticketDetailsForm: FormGroup;
  public submitted: boolean;
  private categoryId: number;

  constructor(
    public activeModal: NgbActiveModal,
    private ticketBoardService: TicketBoardService,
    private categoryDataService: CategoryDataService) { }

  public ngOnInit(): void {
    this.categoryDataService.fetchCategories().subscribe(c => this.categories = c);
    this.ticketDetailsForm = this.createTicketGroup(this.ticket);
  }

  public addTicket(): void {
    const ticket: Ticket = this.ticketDetailsForm.getRawValue() as Ticket;
    this.submitted = true;
    if (this.ticketDetailsForm.valid) {
      if (this.isExistingTicket()) {
        this.ticketBoardService.onTicketUpdated(ticket);
      } else {
        this.ticketBoardService.onTicketAdded(ticket);
      }
      this.activeModal.close();
    }
  }

  public isExistingTicket(): boolean {
    return !!this.ticket?.id;
  }

  private createTicketGroup(ticket: Ticket): FormGroup {
    ticket = ticket ?? {} as Ticket;
    ticket.categoryId ??= this.categoryId;
    return new FormGroup({
        id: new FormControl(ticket.id),
        categoryId: new FormControl(ticket.categoryId, Validators.required),
        labels: new FormControl(ticket.labels),
        title: new FormControl(ticket.title, Validators.required),
        description: new FormControl(ticket.description, Validators.required)
    });
  }
}
