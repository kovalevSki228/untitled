import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TicketBoardService } from 'src/app/shared/services/ticket-board.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Ticket, Comment } from 'src/app/shared/shared.model';

@Component({
  selector: 'app-comment-group',
  templateUrl: './comment-group.component.html',
  styleUrls: ['./comment-group.component.scss']
})
export class CommentGroupComponent implements OnInit {
  @Input() ticket: Ticket;

  public comments: Comment[];
  public isCollapsedAddingComments = true;
  public commentContent: string;

  constructor(
    private ticketBoardService: TicketBoardService,
    private authenticationService: UserService) { }

  public ngOnInit(): void {
    this.ticketBoardService.getTicketComments(this.ticket.id).subscribe(comments => this.comments = comments);
    this.ticketBoardService.fetchComments();
  }

  public addComment(): void {
    if (this.commentContent) {
      const comment: Comment = {
        id: null,
        ticketId: this.ticket.id,
        dateTime: new Date(),
        authorId: this.authenticationService.getUser().id,
        content: this.commentContent
      };
      this.ticketBoardService.onCommentAdded(comment);
      this.commentContent = '';
    }
  }

  private createCommentGroup(): FormGroup {
    return new FormGroup({
      commentContent: new FormControl(null)
    });
  }
}
