import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  //baseUrl = 'http://localhost:5007/api/Transaction';
  baseUrl = 'https://testwnab.azurewebsites.net/api/transaction';
  constructor(private http: HttpClient) {}

  // Get all transactions
  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.baseUrl);
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    // transaction.transactionId = '00000000-0000-0000-0000-000000000000';
    transaction.transactionId = '';
    return this.http.post<Transaction>(this.baseUrl, transaction);
  }

  deleteTransaction(id: string): Observable<Transaction> {
    return this.http.delete<Transaction>(this.baseUrl + '/' + id);
  }

  // duplicateTransaction(id: string): Observable<Transaction> {
  //   return this.http.get<Transaction>(this.baseUrl + '/' + id);
  // }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(
      this.baseUrl + '/' + transaction.transactionId,
      transaction
    );
  }
}
