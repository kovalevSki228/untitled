import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TicketBoardService } from 'src/app/shared/services/ticket-board.service';
import { UserService } from 'src/app/shared/services/user.service';
import { Ticket, Comment, Author } from 'src/app/shared/shared.model';

@Component({
  selector: 'app-comment-group',
  templateUrl: './comment-group.component.html',
  styleUrls: ['./comment-group.component.scss']
})
export class CommentGroupComponent implements OnInit {
  @Input() public ticket: Ticket;
  public comments: Comment[];
  public isCollapsedAddingComments = true;
  public commentContent: string;

  constructor(
    private ticketBoardService: TicketBoardService,
    private userService: UserService) { }

  public ngOnInit(): void {
    this.ticketBoardService.getTicketComments(this.ticket.id).subscribe(comments => this.comments = comments.reverse());
    this.ticketBoardService.fetchComments();
  }

  public addComment(): void {
    if (this.commentContent) {
      const comment: Comment = {
        id: null,
        ticketId: this.ticket.id,
        createdAt: new Date(),
        author: {
          id: this.userService.getUserId
        } as Author,
        content: this.commentContent
      };
      this.ticketBoardService.onCommentAdded(comment);
      this.isCollapsedAddingComments = true;
      this.commentContent = '';
    }
  }
}
