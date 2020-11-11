import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {

  myFirstReactiveForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm(){
    this.myFirstReactiveForm = this.fb.group({
     title: ['Иван'],
     category: ['TODO', 'In Progres', 'Done']
    });
   }

}
