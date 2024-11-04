import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CryptoResponseArray } from '../../interfaces/crypto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CoinGeckoService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.coingecko.com/api/v3';
  private currency = 'usd';

  getCryptoData(): Observable<CryptoResponseArray> {
    return this.http.get<CryptoResponseArray>(`${this.apiUrl}/coins/markets?vs_currency=${this.currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`);
  }
}