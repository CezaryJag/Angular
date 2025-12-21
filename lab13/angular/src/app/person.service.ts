import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Person {
  id?: number;
  firstName?: string;
  familyName?: string;
  age?: number;
  address: {
    city?: string;
    street?: string;
    postCode?: string;
  };
}

@Injectable({ providedIn: 'root' })
export class PersonService {
  private baseUrl = 'http://localhost:8080/persons';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseUrl).pipe(catchError(this.handleError));
  }

  getByIndex(index: number): Observable<Person | null> {
    if (index == null) {
      return of(null);
    }
    return this.http.get<Person>(`${this.baseUrl}/${index}`).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 404) {
          return of(null);
        }
        return this.handleError(err);
      })
    );
  }

  add(person: Person): Observable<Person> {
    return this.http.post<Person>(this.baseUrl, person).pipe(catchError(this.handleError));
  }

  update(index: number, person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.baseUrl}/${index}`, person).pipe(catchError(this.handleError));
  }

  delete(index: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${index}`).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse | any): Observable<never> {
    console.error('PersonService error', err);
    let message = 'Wystąpił nieoczekiwany błąd.';
    if (err instanceof HttpErrorResponse) {
      if (err.error && err.error.message) {
        message = err.error.message;
      } else if (err.status) {
        message = `Błąd serwera: ${err.status} ${err.statusText}`;
      }
    } else if (err && err.message) {
      message = err.message;
    }
    return throwError(() => new Error(message));
  }
}
