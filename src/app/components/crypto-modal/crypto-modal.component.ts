import { Component, Input } from '@angular/core';
import { CryptoService } from '../../services/crypto/crypto.service';
import { buySellCryptoPayload, CryptoResponse } from '../../interfaces/crypto.interfaces';
import { mockCrypto } from '../../constants/constants';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui/button/button.component';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-crypto-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './crypto-modal.component.html',
})
export class CryptoModalComponent {
  @Input() crypto: CryptoResponse = mockCrypto;
  @Input() email: string = '';
  isVisible: boolean = false;
  isLoading: boolean = false;
  userBalance: number = 0;

  constructor(private cryptoService: CryptoService, private userService: UserService) {}

  async open() {
    this.isVisible = true;
    this.userBalance = await this.userService.getUserBalance(this.email);
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
    console.log(this.userBalance)
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