import { BackendService } from './../../../../shared/services/backend.service';
import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/shared/shared.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  constructor(public backendService: BackendService) { }

  public ngOnInit(): void {
  }

}
