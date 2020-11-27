import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../shared.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryDataService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public fetchCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}category`);
  }

  public addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}category`, category);
  }

  public updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}category/`, category);
  }

  public deleteCategory(categoryId: number): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}category/${categoryId}`);
  }
}
