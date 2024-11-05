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
  @Input() userBalance: number = 10000;
  isVisible: boolean = false;
  isLoading: boolean = false;

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

  async buyCrypto() {
    this.isLoading = true;
    const payload = this.createPayload();
    try {
      await this.cryptoService.buyCrypto(payload);
      window.alert('Crypto bought successfully');
    } catch (error) {
      window.alert('Failed to buy crypto');
    } finally {
      setTimeout(() => {
        this.isLoading = false;
        this.close();
      }, 3000);
    }
  }

  async sellCrypto() {
    this.isLoading = true;
    const payload = this.createPayload();
    try {
      await this.cryptoService.sellCrypto(payload);
      window.alert('Crypto sold successfully');
    } catch (error) {
      window.alert('Failed to sell crypto');
    } finally {
      setTimeout(() => {
        this.isLoading = false;
        this.close();
      }, 3000);
    }
  }
}