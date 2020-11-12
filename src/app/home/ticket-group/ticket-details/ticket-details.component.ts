import { TicketBoardService } from './../../../shared/services/ticket-board.services';
import { Ticket } from 'src/app/shared/shared.model';
import { Category, TicketPreview } from './../../../shared/shared.model';
import { BackendService } from './../../../shared/services/backend.services';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export class NgbdModalContent {
  constructor(public activeModal: NgbActiveModal) { }
}


@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  @Output() ticketAdded = new EventEmitter<TicketPreview>();

  public categories: Category[];
  public title: string;
  public selectCategory: Category;
  public description: string;

  public myFirstReactiveForm: FormGroup;

  constructor(public backendService: BackendService,
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private ticketBoardService: TicketBoardService) { }

  ngOnInit(): void {
    this.backendService.fetchCategories().subscribe(c => this.categories = c);
    this.initForm();
  }

  public addTicket(): void {

    const ticket: TicketPreview = this.myFirstReactiveForm.getRawValue() as TicketPreview;
    this.ticketBoardService.onTicketAdded(ticket);

    console.log(ticket);
  }

  initForm() {
    this.myFirstReactiveForm = this.fb.group({
      id: [null],
      categoryId: [null],
      title: [this.title],
      description: [this.description]
    });
  }

}

