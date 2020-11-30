import { AuthenticationDataService } from '../../../../shared/services/authentication-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/shared.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  constructor(
    public userService: UserService) { }

  public ngOnInit(): void {
  }

  public get userName(): string {
    return this.userService.getUser().email;
  }

}
