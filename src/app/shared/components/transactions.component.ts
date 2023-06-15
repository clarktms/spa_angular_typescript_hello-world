import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TransactionsService } from '../../core/services/transactions.service';
import { Transaction } from '../../core/models/transaction.model';

@Component({
  selector: 'transactions-page',
  template: `
    <div class="fab-container title-plus">
      <div class="button iconbutton">
        <i class="fa-solid fa-plus" (click)="openPopup()"></i>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <h3 class="col-10">Transactions</h3>
      </div>
      <div
        class="modal"
        tabindex="-1"
        role="dialog"
        [ngStyle]="{ display: displayStyle }"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Transaction</h4>
            </div>
            <div class="modal-body">
              <form #form="ngForm">
                <div class="form-group">
                  <label for="">Description</label>
                  <input
                    type="text"
                    name="desc"
                    [(ngModel)]="transaction.description"
                  />
                </div>
                <div class="form-group">
                  <label for="">Amount</label>
                  <input
                    type="number"
                    name="transactionAmount"
                    [(ngModel)]="transaction.amount"
                  />
                </div>
                <div class="form-group form-group-inline">
                  <div>
                    <label for="">Date</label>
                    <input
                      type="date"
                      name="date"
                      [(ngModel)]="transaction.date"
                    />
                  </div>
                  <div>
                    <label for="">Credit</label>
                    <input
                      type="checkbox"
                      name="credit"
                      [(ngModel)]="transaction.credit"
                    />
                  </div>
                </div>
                <div class="form-group form-group-inline">
                  <div>
                    <label for="">Category</label>
                    <input
                      type="text"
                      name="cateogry"
                      [(ngModel)]="transaction.category"
                    />
                  </div>
                  <div>
                    <label for="">Active</label>
                    <input
                      type="checkbox"
                      name="active"
                      [(ngModel)]="transaction.active"
                    />
                  </div>
                </div>
                <div class="form-group form-group-inline"></div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                (click)="onSubmit(); closePopup()"
              >
                Save
              </button>
              <button
                type="button"
                class="btn btn-danger"
                (click)="cancelForm(); closePopup()"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
              <th scope="col">Active</th>
              <th scope="col">Credit</th>
              <th scope="col">Category</th>
              <th scope="col"></th>
              <th class="new-transaction" scope="col" (click)="openPopup()">
                <i class="fa-solid fa-circle-plus"> </i> New
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="table-light"
              *ngFor="let transaction of transactions; index as i"
              index="i"
            >
              <td
                (click)="pupulateForm(transaction); openPopup()"
                data-cell="Index"
              >
                {{ i + 1 }}
              </td>
              <td
                (click)="pupulateForm(transaction); openPopup()"
                data-cell="Description"
              >
                {{ transaction.description }}
              </td>
              <td
                (click)="pupulateForm(transaction); openPopup()"
                data-cell="Amount"
              >
                {{ transaction.amount | currency }}
              </td>
              <td
                (click)="pupulateForm(transaction); openPopup()"
                data-cell="Date"
              >
                {{ transaction.date | date: 'yyyy-MM-dd' }}
              </td>
              <td
                (click)="pupulateForm(transaction); openPopup()"
                data-cell="Active"
              >
                {{ transaction.active }}
              </td>
              <td
                (click)="pupulateForm(transaction); openPopup()"
                data-cell="Credit"
              >
                {{ transaction.credit }}
              </td>
              <td
                (click)="pupulateForm(transaction); openPopup()"
                data-cell="Category"
              >
                {{ transaction.category }}
              </td>
              <td data-cell="Delete">
                <a (click)="deleteTransaction(transaction.transactionId)"
                  ><i class="fa-solid fa-trash-can del-transaction"></i>
                </a>
              </td>
              <td data-cell="Duplicate">
                <a (click)="duplicateTransaction(transaction)"
                  ><i class="fa-solid fa-copy"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class TransactionsComponent implements OnInit {
  title = 'transactions';
  transactions: Transaction[] = [];
  transaction: Transaction = {
    transactionId: '',
    description: '',
    amount: 0,
    date: new Date(),
    credit: true,
    active: true,
    category: '',
  };

  displayStyle = 'none';

  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }

  constructor(private transactionsService: TransactionsService) {}
  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions() {
    this.transactionsService.getAllTransactions().subscribe((response) => {
      this.transactions = response;
      return this.transactions;
    });
  }

  duplicateTransaction(transaction: Transaction) {
    this.transactionsService
      .addTransaction(transaction)
      .subscribe((response) => {
        this.getAllTransactions();
      });
  }

  onSubmit() {
    if (this.transaction.transactionId === '') {
      this.transactionsService
        .addTransaction(this.transaction)
        .subscribe((response) => {
          this.getAllTransactions();
          this.transaction = {
            transactionId: '',
            description: '',
            amount: 0,
            date: new Date(),
            credit: true,
            active: true,
            category: '',
          };
        });
    } else {
      this.updateTransaction(this.transaction);
    }
  }

  cancelForm() {
    this.transaction = {
      transactionId: '',
      description: '',
      amount: 0,
      date: new Date(),
      credit: true,
      active: true,
      category: '',
    };
  }

  deleteTransaction(id: string) {
    this.transactionsService.deleteTransaction(id).subscribe((response) => {
      this.getAllTransactions();
    });
  }

  // duplicateTransaction(id: string) {
  //   this.transactionsService.duplicateTransaction(id).subscribe((response) => {
  //     response.transactionId = '';
  //     this.transactionsService
  //       .addTransaction(response)
  //       .subscribe((response) => {
  //         this.getAllTransactions();
  //       });
  //   });
  // }

  pupulateForm(transaction: Transaction) {
    this.transaction = transaction;
    console.log(transaction);
  }

  updateTransaction(transaction: Transaction) {
    this.transactionsService
      .updateTransaction(transaction)
      .subscribe((response) => {
        this.getAllTransactions();
        this.transaction = {
          transactionId: '',
          description: '',
          amount: 0,
          date: new Date(),
          credit: true,
          active: true,
          category: '',
        };
      });
  }
}
