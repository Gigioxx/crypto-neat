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

  buyCrypto() {
    this.isLoading = true;
    const payload = this.createPayload();
    this.cryptoService.buyCrypto(payload).subscribe({
      next: () => {
        window.alert('Crypto bought successfully');
      },
      error: (error) => {
        window.alert('Failed to buy crypto: ' + error);
        this.isLoading = false;
      },
      complete: () => {
          this.isLoading = false;
          this.close();
      }
    });
  }

  sellCrypto() {
    this.isLoading = true;
    const payload = this.createPayload();
    this.cryptoService.sellCrypto(payload).subscribe({
      next: () => {
        window.alert('Crypto sold successfully');
      },
      error: (error) => {
        window.alert('Failed to sell crypto: ' + error);
        this.isLoading = false;
      },
      complete: () => {
          this.isLoading = false;
          this.close();
      }
    });
  }
}