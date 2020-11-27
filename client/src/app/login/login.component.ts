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
  public wrongData: boolean;

  constructor(
    private authenticationService: UserService,
    private router: Router) { }

  public ngOnInit(): void {
    this.userGroup = this.createUserGroup();
  }

  public login(): void {
    this.submitted = true;
    const user = this.userGroup.getRawValue() as User;
    if (user.email !== null && user.password != null) {
      this.authenticationService.login(user)
        .subscribe(res => {
          this.router.navigate(['']);
        }, error => {
          this.wrongData = true;
        });
    }
  }

  public registering(): void {

  }

  private createUserGroup(): FormGroup {
    const user = {} as User;
    return new FormGroup({
      email: new FormControl(user.email, Validators.required),
      password: new FormControl(user.password, Validators.required)
    });
  }

}
