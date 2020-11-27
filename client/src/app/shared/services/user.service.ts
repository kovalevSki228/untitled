import { Observable } from 'rxjs';
import { AuthenticationDataService } from './authentication-data.service';
import { Injectable } from '@angular/core';
import { User, Token } from '../shared.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authenticationDataService: AuthenticationDataService) { }

  public getUser(): User {
    return this.authenticationDataService.getUser();
  }

  public login(user: User): Observable<Token> {
    return this.authenticationDataService.login(user);
  }

  public isAuthenticated(): boolean {
    return this.authenticationDataService.isAuthenticated();
  }

  public logout(): void {
    return this.authenticationDataService.logout();
  }
}
