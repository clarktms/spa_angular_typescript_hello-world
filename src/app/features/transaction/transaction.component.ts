import { Component, OnInit } from '@angular/core';
import { MessageService } from '@app/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styles: [],
})
export class TransactionComponent implements OnInit {
  message = '';

  constructor(public messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.getProtectedResource().subscribe((response) => {
      const { data, error } = response;

      if (data) {
        this.message = JSON.stringify(data, null, 2);
      }

      if (error) {
        this.message = JSON.stringify(error, null, 2);
      }
    });
  }
}
