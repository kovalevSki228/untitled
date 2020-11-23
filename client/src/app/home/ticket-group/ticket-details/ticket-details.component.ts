import { AuthenticationService } from './../../../shared/services/authentication.service';
import { TicketBoardService } from '../../../shared/services/ticket-board.service';
import { Category, Ticket, Comment } from './../../../shared/shared.model';
import { BackendService } from '../../../shared/services/backend.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  @Input() ticket: Ticket;
  @Output() ticketAdded = new EventEmitter<Ticket>();

  public categoryId: number;
  public categories: Category[];
  public comments: Comment[];
  public ticketDetailsForm: FormGroup;
  public submitted: boolean;

  constructor(
    public backendService: BackendService,
    public activeModal: NgbActiveModal,
    private ticketBoardService: TicketBoardService,
    private authenticationService: AuthenticationService) { }

  public ngOnInit(): void {
    this.backendService.fetchCategories().subscribe(c => this.categories = c);
    this.ticketDetailsForm = this.createTicketGroup(this.ticket);
    if (this.isExistingTicket()) {
      this.ticketBoardService.getTicketComments(this.ticket.id).subscribe(comments => this.comments = comments);
    }
  }

  public addTicket(): void {
    const ticket: Ticket = this.ticketFormGroup.value as Ticket;
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

  public addComment(): void {
    const commentContent: string = this.commentFormControl.value;
    if (commentContent) {
      const comment: Comment = {
        id: null,
        ticketId: this.ticket.id,
        date: new Date(),
        author: this.authenticationService.getUser(),
        content: commentContent
      };
      this.ticketBoardService.onCommentAdded(comment);
    }
  }

  public isExistingTicket(): boolean {
    return !!this.ticket?.id;
  }

  private createTicketGroup(ticket: Ticket): FormGroup {
    ticket = ticket ?? {} as Ticket;
    ticket.categoryId ??= this.categoryId;
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

  get ticketFormGroup(): FormGroup {
    return this.ticketDetailsForm.get('ticketGroup') as FormGroup;
  }

  get commentFormControl(): FormControl {
    return this.ticketDetailsForm.get('commentContent') as FormControl;
  }
}
