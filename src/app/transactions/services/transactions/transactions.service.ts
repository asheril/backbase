import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../../models';

const transactionsUrl = 'data';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private httpClient: HttpClient) {}

  getTransactions(phrase: string): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(this.urlWithFiltering(phrase));
  }

  private urlWithFiltering(phrase: string): string {
    return phrase === null ? transactionsUrl : `${transactionsUrl}?q=${phrase}`;
  }
}
