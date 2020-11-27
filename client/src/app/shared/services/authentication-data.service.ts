import { ActivatedRoute, Router } from '@angular/router';
import { AUTH_API_URL } from './../../app-injection-tokens';
import { Observable } from 'rxjs';
import { User, Token } from '../shared.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { inject } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';
import { tap } from 'rxjs/operators';

export const ACCESS_TOKEN_KEY = 'user_acess_token';

const DATABASE = {
  USER: [
    {
      id: '1',
      email: 'kovalevSki',
      password: 'Password1!'
    }] as User[]
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationDataService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router) { }

  public getUser(): User {
    return DATABASE.USER[0];
  }

  public login(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}authentication/login`, user)
    .pipe(
      tap(token => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
      })
    );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  public logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['login']);
  }
}
