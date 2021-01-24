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

  getTransactions(): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(transactionsUrl);
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.httpClient.post<Transaction>(transactionsUrl, {
      ...transaction,
      id: Date.now(),
    });
  }
}
