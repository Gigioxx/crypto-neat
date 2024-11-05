import { Component, Input } from '@angular/core';
import { userTransactionsList } from '../../interfaces/user.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-history-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-history-list-component.html',
})
export class TransactionHistoryListComponent {
  @Input() transactions: userTransactionsList | null  = [];
}
