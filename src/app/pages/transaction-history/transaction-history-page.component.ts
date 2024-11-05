import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { userTransactionsList } from '../../interfaces/user.interfaces';
import { TransactionHistoryListComponent } from '../../components/transaction-history-list/transaction-history-list-component';
import { CommonModule } from '@angular/common';
import { defaultIfEmpty, from, Observable } from 'rxjs';

@Component({
  selector: 'app-transaction-history-page',
  standalone: true,
  imports: [TransactionHistoryListComponent, CommonModule],
  templateUrl: './transaction-history-page.component.html',
})
export class TransactionHistoryPageComponent implements OnInit {
  transactions$!: Observable<userTransactionsList>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.transactions$ = from(this.userService.getUserTransactions('guillermo.casanova.b@gmail.com')).pipe(
      defaultIfEmpty([]) // Provide an empty array as the default value
    );
  }
}
