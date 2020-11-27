import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router) { }

  public canActivate(): boolean {
    if (!this.userService.isAuthenticated()) {
      this.router.navigate(['login']);
    }

    return true;
  }

}
