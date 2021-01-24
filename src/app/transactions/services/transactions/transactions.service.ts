import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sorter, Transaction } from '../../models';

const transactionsUrl = 'data';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private httpClient: HttpClient) {}

  getTransactions(phrase: string, sorter: Sorter): Observable<Transaction[]> {
    return this.httpClient.get<Transaction[]>(
      this.urlWithFiltering(phrase, sorter)
    );
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.httpClient.post<Transaction>(transactionsUrl, {
      ...transaction,
      id: Date.now(),
    });
  }

  private urlWithFiltering(phrase: string, sorter: Sorter): string {
    const fragments = [
      this.phraseFragment(phrase),
      this.sorterFragment(sorter),
    ].filter((fragment) => fragment !== null);

    return fragments.length
      ? `${transactionsUrl}?${fragments.join('&')}`
      : transactionsUrl;
  }

  private phraseFragment(phrase: string): string {
    if (phrase === null) {
      return null;
    }

    return `q=${phrase}`;
  }

  private sorterFragment(sorter: Sorter): string {
    if (sorter === null) {
      return null;
    }

    switch (sorter) {
      case Sorter.Amount:
        return '_sort=transaction.amountCurrency.amount';
      case Sorter.Beneficiary:
        return '_sort=transaxtion.merchant.name';
      case Sorter.Date:
        return '_sort=dates.valueDate';
      default:
        return null;
    }
  }
}
