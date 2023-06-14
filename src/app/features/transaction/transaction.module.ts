import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TransactionComponent } from './transaction.component';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [TransactionComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TransactionComponent,
      },
    ]),
  ],
})
export class TransactionModule {}
