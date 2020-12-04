import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public router: Router,
    private authenticationService: UserService) { }

  public ngOnInit(): void {
  }

  public logout(): void {
    this.authenticationService.logout();
  }

  public get userName(): string {
    return this.authenticationService.displayName;
  }
}
