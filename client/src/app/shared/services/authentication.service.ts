import { BackendService } from './backend.service';
import { Injectable } from '@angular/core';
import { User } from '../shared.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private backendService: BackendService) { }

  public getUser(): User {
    return this.backendService.getUser();
  }
}
