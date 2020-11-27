import { UserService } from './shared/services/user.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Alarm, AlarmFill, AlignBottom } from 'ngx-bootstrap-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public router: Router,
    private authenticationService: UserService,
    private acivatedRoute: ActivatedRoute) { }

  public atHomePage(): boolean {
    return this.router.url === '/';
  }

  public logout(): void {
    this.authenticationService.logout();
  }

  public get userName(): string {
    return this.authenticationService.getUser().email;
  }

  public get IsLoggedIn(): boolean {
    if (!this.authenticationService.isAuthenticated()
    && this.router.url !== '/login') {
      this.router.navigate(['login']);
    }
    return this.authenticationService.isAuthenticated();
  }
}
