import { AuthenticationDataService } from '../../../../shared/services/authentication-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/shared.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  constructor(public authenticationDataService: AuthenticationDataService) { }

  public ngOnInit(): void {
  }

  public get userName(): string {
    return this.authenticationDataService.getUser().email;
  }

}
