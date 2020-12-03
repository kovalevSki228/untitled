import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN_KEY, AuthenticationDataService } from './authentication-data.service';
import { Injectable } from '@angular/core';
import { User, Token } from '../shared.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private authenticationDataService: AuthenticationDataService,
    private jwtHelper: JwtHelperService,
    private router: Router) { }

  public get displayName(): string {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const user = this.jwtHelper.decodeToken(token) as User;
    return user.email;
  }

  public get getUserId(): string {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    const user = this.jwtHelper.decodeToken(token) as User;
    return user.id;
  }

  public getEmailUserById(id: string): Observable<string> {
    return this.authenticationDataService.getEmailUserById(id);
  }

  public login(user: User): Observable<Token> {
    return this.authenticationDataService.login(user);
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
