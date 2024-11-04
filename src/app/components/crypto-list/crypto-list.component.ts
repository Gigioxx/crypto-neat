import { Component, Input } from '@angular/core';
import { CryptoResponseArray } from '../../interfaces/crypto.interfaces';
import { CryptoCardComponent } from "../crypto-card/crypto-card.component";

@Component({
  selector: 'app-crypto-list',
  standalone: true,
  imports: [CryptoCardComponent],
  templateUrl: './crypto-list.component.html',
})
export class CryptoListComponent {
  @Input() cryptoData: CryptoResponseArray = [];

}
