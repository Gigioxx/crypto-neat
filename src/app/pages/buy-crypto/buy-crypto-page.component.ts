import { Component, OnInit } from '@angular/core';
import { CryptoListComponent } from '../../components/crypto-list/crypto-list.component';
import { CryptoResponseArray } from '../../interfaces/crypto.interfaces';
import { CoinGeckoService } from '../../services/coinGecko/coinGecko.service';

@Component({
  selector: 'app-buy-crypto-page',
  standalone: true,
  imports: [CryptoListComponent],
  templateUrl: './buy-crypto-page.component.html',
})
export class BuyCryptoPageComponent implements OnInit {
  cryptoData: CryptoResponseArray = [];

  constructor(private coinGeckoService: CoinGeckoService) {}

  ngOnInit(): void {
    this.fetchCryptoData();
  }

  fetchCryptoData(): void {
    this.coinGeckoService.getCryptoData().subscribe(
      data => {
        this.cryptoData = data;
      },
      error => {
        console.error('Error fetching data', error);
      }
    );
  }

}
