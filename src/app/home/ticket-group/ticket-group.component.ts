import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticket-group',
  templateUrl: './ticket-group.component.html',
  styleUrls: ['./ticket-group.component.css']
})
export class CategoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  arr = [1,2,3,4]
}
