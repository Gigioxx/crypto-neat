import { Component, Input } from '@angular/core';
import { CryptoService } from '../../services/crypto/crypto.service';
import { buySellCryptoPayload, CryptoResponse } from '../../interfaces/crypto.interfaces';
import { mockCrypto } from '../../constants/constants';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'app-crypto-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './crypto-modal.component.html',
})
export class CryptoModalComponent {
  @Input() crypto: CryptoResponse = mockCrypto;
  @Input() email: string = '';
  @Input() userBalance: number = 0;
  isVisible: boolean = false;

  constructor(private cryptoService: CryptoService) {}

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

  private createPayload(): buySellCryptoPayload {
    return {
      email: this.email,
      userBalance: this.userBalance,
      crypto: this.crypto.id,
      cryptoAmount: 1,
      currentPrice: this.crypto.current_price,
    };
  }

  buyCrypto() {
    const payload = this.createPayload();
    this.cryptoService.buyCrypto(payload);
    this.close();
    window.alert('Crypto bought successfully');
  }

  sellCrypto() {
    const payload = this.createPayload();
    this.cryptoService.sellCrypto(payload);
    this.close();
    window.alert('Crypto sold successfully');
  }
}