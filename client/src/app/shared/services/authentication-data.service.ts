import { Observable } from 'rxjs';
import { User, Token } from '../shared.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

export const ACCESS_TOKEN_KEY = 'user_acсess_token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationDataService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}authentication/login`, user)
      .pipe(
        tap(token => {
          localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
        })
      );
  }
}
