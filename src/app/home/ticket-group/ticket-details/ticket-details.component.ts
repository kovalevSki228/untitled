import { Category, Ticket, TicketPreview } from './../../../shared/shared.model';
import { BackendService } from './../../../shared/services/backend.services';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { title } from 'process';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  @Output() ticketAdded = new EventEmitter<TicketPreview>();

  public categories: Category[];
  public title: string;
  public selectCategory: Category;
  public description: string;
  // myFirstReactiveForm: FormGroup;

  constructor(public backendService: BackendService) { }

  ngOnInit(): void {
    this.backendService.fetchCategories().subscribe(c => this.categories = c);
  }

  public addTicket(): void {
    const ticket: TicketPreview = {
      id: null,
      categoryId: this.selectCategory.id,
      title: this.title,
      description: this.description
    };
    this.ticketAdded.emit(ticket);
    console.log(this.title, this.selectCategory, this.description);
  }

  // initForm(){
  //   this.myFirstReactiveForm = this.fb.group({
  //    title: ['Иван'],
  //    category: ['TODO', 'In Progres', 'Done']
  //   });
  //  }

}
