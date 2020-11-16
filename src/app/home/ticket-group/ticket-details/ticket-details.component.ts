import { Ticket } from 'src/app/shared/shared.model';
import { TicketBoardService } from './../../../shared/services/ticket-board.services';
import { Category, TicketPreview, Comment } from './../../../shared/shared.model';
import { BackendService } from './../../../shared/services/backend.services';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public comments: Comment[];
  public contentComment: string;
  public ticketDetailsForm: FormGroup;
  public submitted: boolean;

  constructor(
    public backendService: BackendService,
    public activeModal: NgbActiveModal,
    private ticketBoardService: TicketBoardService) { }

  ngOnInit(): void {
    this.backendService.fetchCategories().subscribe(c => this.categories = c);
    this.ticketDetailsForm = this.creatTicketGroup(this.ticket);
    if (!this.isExistingTicket()) {
      this.ticketBoardService.getCommentsByCategory(this.ticket.id).subscribe(comments => this.comments = comments);
    }
  }

  addTicket(): void {
    const ticket: Ticket = this.ticketFormGroup.value as Ticket;
    this.submitted = true;
    if (this.ticketDetailsForm.valid) {
      if (this.isExistingTicket()) {
        this.ticketBoardService.onTicketAdded(ticket);
      } else {
        this.ticketBoardService.onTicketUpdate(ticket);
      }
      //this.activeModal.close('Close click');
    }
  }

  addComment(): void {
    const contentCommentent: string = this.commentFormControl.value;
    if (contentCommentent) {
      const comment: Comment = {
        id: null,
        ticketId: this.ticket.id,
        date: new Date(),
        author: this.ticketBoardService.getUser(),
        content: contentCommentent
      };
      this.ticketBoardService.onCommentAdded(comment);
    }
  }

  isExistingTicket(): boolean {
    return !this.ticket?.id;
  }

  creatTicketGroup(ticket: Ticket): FormGroup {
    ticket = ticket ?? {} as Ticket;
    return new FormGroup({
      ticketGroup: new FormGroup({
        id: new FormControl(ticket.id),
        categoryId: new FormControl(ticket.categoryId, Validators.required),
        labels: new FormControl(ticket.labels),
        title: new FormControl(ticket.title, Validators.required),
        description: new FormControl(ticket.description, Validators.required),
        comments: new FormControl(this.comments)
      }),
      commentContent: new FormControl(null)
    });
  }

  // ticketGroup
  get ticketFormGroup(): FormGroup {
    return this.ticketDetailsForm.get('ticketGroup') as FormGroup;
  }

  // commentControl
  get commentFormControl(): FormControl {
    return this.ticketDetailsForm.get('commentContent') as FormControl;
  }
}
