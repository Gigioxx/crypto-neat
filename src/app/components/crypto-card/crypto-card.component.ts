import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CryptoResponse } from '../../interfaces/crypto.interfaces';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../services/crypto/crypto.service';
import { CryptoModalComponent } from '../crypto-modal/crypto-modal.component';
import { UserService } from '../../services/user/user.service';
import { getAdditionalUserInfo, getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase-config';

@Component({
  selector: 'app-crypto-card',
  standalone: true,
  imports: [CommonModule, CryptoModalComponent],
  templateUrl: './crypto-card.component.html',
})
export class CryptoCardComponent implements OnInit {
  @ViewChild('cryptoModal') cryptoModal!: CryptoModalComponent;

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

  userEmail: string = '';

  ngOnInit() {
    this.getUserEmail();
  }

  getUserEmail(): void {
    onAuthStateChanged(auth, (user) => {
      this.userEmail = user?.email || '';
    });
  }


  openModal() {
    this.cryptoModal.open();
  }

}
