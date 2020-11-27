import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../shared.model';

@Injectable({
  providedIn: 'root'
})
export class CommentDataService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public fetchComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}comment`);
  }

  public addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}comment`, comment);
  }
}
