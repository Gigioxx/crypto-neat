import { Component, Input } from '@angular/core';
import { CryptoResponse } from '../../interfaces/crypto.interfaces';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../services/crypto/crypto.service';

@Component({
  selector: 'app-crypto-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-card.component.html',
})
export class CryptoCardComponent {

  constructor(private cryptoService: CryptoService) {}

  @Input() crypto: CryptoResponse = {
    id: '',
    symbol: '',
    name: '',
    image: '',
    current_price: 0,
    market_cap: 0,
    market_cap_rank: 0,
    fully_diluted_valuation: 0,
    total_volume: 0,
    high_24h: 0,
    low_24h: 0,
    price_change_24h: 0,
    price_change_percentage_24h: 0,
    market_cap_change_24h: 0,
    market_cap_change_percentage_24h: 0,
    circulating_supply: 0,
    total_supply: 0,
    max_supply: 0,
    ath: 0,
    ath_change_percentage: 0,
    ath_date: '',
    atl: 0,
    atl_change_percentage: 0,
    atl_date: '',
    roi: null,
    last_updated: ''
  };

  buyCrypto() {
    const payload = {
      email: 'guillermo.casanova.b@gmail.com',
      userBalance: 61743,
      crypto: this.crypto.symbol,
      amount: 1,
      currentPrice: this.crypto.current_price
    }
    this.cryptoService.buyCrypto(payload).subscribe({
      next: (response) => {
        console.log('Transaction completed');
      },
      error: (error) => {
        console.error('Error processing transaction');
      }
    });
  }

}
