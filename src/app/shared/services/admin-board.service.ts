import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../shared.model';
import { BackendService } from './backend.services';

@Injectable({
  providedIn: 'root'
})
export class AdminBoardService {

  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  public categories = this.categoriesSubject.asObservable();

  constructor(private backendService: BackendService) { }

  fetchCategories(): void {
    this.backendService.fetchCategories()
      .pipe(
        map(category => category.sort((a, b) => a.order > b.order ? 1 : -1))
      )
      .subscribe(category => {
        this.categoriesSubject.next(category);
        console.log(category);
      });
  }

  onCategoryAdded(category: Category): void {
    this.backendService.addCategory(category).subscribe(() => this.fetchCategories());
  }

  onCategoryUpdate(category: Category): void {
    this.backendService.addUpdated(category).subscribe(() => this.fetchCategories());
  }

  getCountTicketsFromCategory(categoryId: number): Observable<number> {
    return this.backendService.fetchTickets().pipe(
      map(items => items.filter(i => i.categoryId === categoryId).length));
  }
}
