import { Router } from '@angular/router';
import { User } from './../shared/shared.model';
import { UserService } from '../shared/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public name: string;
  public password: string;
  public userGroup: FormGroup;
  public isLoading: boolean;
  public submitted: boolean;
  public showAuthenticationErrorBox: boolean;

  constructor(
    private authenticationService: UserService,
    private router: Router) { }

  public ngOnInit(): void {
    this.userGroup = this.createUserGroup();
  }

  public login(): void {
    this.isLoading = true;
    this.submitted = true;
    const user = this.userGroup.getRawValue() as User;
    if (this.userGroup.valid) {
      this.authenticationService.login(user)
        .subscribe(res => {
          this.router.navigate(['']);
        }, error => {
          this.showAuthenticationErrorBox = true;
          this.isLoading = false;
        });
    } else {
      this.isLoading = false;
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

}
