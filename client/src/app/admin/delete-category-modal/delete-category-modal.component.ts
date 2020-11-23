import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-category-modal',
  templateUrl: './delete-category-modal.component.html',
  styleUrls: ['./delete-category-modal.component.scss']
})
export class DeleteCategoryModalComponent implements OnInit {
  public isDeleteActionAvailable: boolean;

  constructor(public activeModal: NgbActiveModal) { }

  public ngOnInit(): void {
  }
}
