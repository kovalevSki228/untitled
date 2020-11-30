import { User } from './../../shared/shared.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public userGroup: FormGroup;

  constructor(public activeModal: NgbActiveModal) { }

  public ngOnInit(): void {
    this.userGroup = this.createUserGroup();
  }

  public addUser(): void {

  }

  private createUserGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

}
