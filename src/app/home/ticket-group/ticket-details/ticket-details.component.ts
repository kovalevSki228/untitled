import { TicketBoardService } from './../../../shared/services/ticket-board.services';
import { Ticket } from 'src/app/shared/shared.model';
import { Category, TicketPreview } from './../../../shared/shared.model';
import { BackendService } from './../../../shared/services/backend.services';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  @Input() ticket: Ticket;
  @Output() ticketAdded = new EventEmitter<TicketPreview>();

  public categories: Category[];
  public ticketDetailsForm: FormGroup;

  constructor(
    public backendService: BackendService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private ticketBoardService: TicketBoardService) { }

  ngOnInit(): void {
    this.backendService.fetchCategories().subscribe(c => this.categories = c);
    this.ticketDetailsForm = this.creatTicketGroup(this.ticket);
  }

  addTicket(): void {
    const ticket: TicketPreview = this.ticketDetailsForm.getRawValue() as TicketPreview;
    if (this.isExistingTicket()) {
      this.ticketBoardService.onTicketAdded(ticket);
    }
    else {
      this.ticketBoardService.onTicketUpdate(ticket);
    }
  }

  isExistingTicket(): boolean {
    return !this.ticket?.id;
  }

  creatTicketGroup(ticket: Ticket): FormGroup {
    ticket = ticket ?? {} as Ticket;
    return this.fb.group({
      id: [ticket.id],
      categoryId: [ticket.categoryId],
      labels: [ticket.labels],
      title: [ticket.title],
      description: [ticket.description]
    });
  }
}
