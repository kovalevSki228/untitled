import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../shared.model';

@Injectable({
  providedIn: 'root'
})
export class TicketDataService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public fetchTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}ticket`);
  }

  public addTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${this.apiUrl}ticket`, ticket);
  }

  public updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}ticket/`, ticket);
  }
}
