import { Component, Input } from '@angular/core';
import { CryptoResponseArray } from '../../interfaces/crypto.interfaces';

@Component({
  selector: 'app-crypto-list',
  standalone: true,
  imports: [],
  templateUrl: './crypto-list.component.html',
})
export class CryptoListComponent {
  @Input() CryptoData: CryptoResponseArray = [];

}
