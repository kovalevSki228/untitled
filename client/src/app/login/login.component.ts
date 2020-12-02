import { Router } from '@angular/router';
import { User } from './../shared/shared.model';
import { logging } from 'protractor';
import { UserService } from '../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public name: string;
  public password: string;
  public userGroup: FormGroup;
  public submitted: boolean;
  public showAuthenticationErrorBox: boolean;

  constructor(
    private authenticationService: UserService,
    private router: Router) { }

  public ngOnInit(): void {
    this.userGroup = this.createUserGroup();
  }

  public login(): void {
    this.submitted = true;
    const user = this.userGroup.getRawValue() as User;
    if (this.userGroup.valid) {
      this.authenticationService.login(user)
        .subscribe(res => {
          this.router.navigate(['']);
        }, error => {
          this.showAuthenticationErrorBox = true;
        });
    }
  }

  public register(): void {

  }

  private createUserGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  public get authenticationError(): boolean {
    return this.submitted && this.showAuthenticationErrorBox;
  }

}
