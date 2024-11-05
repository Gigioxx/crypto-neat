import { Component, Input } from '@angular/core';
import { CryptoResponse } from '../../interfaces/crypto.interfaces';
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
  isVisible = false;
  @Input() crypto: CryptoResponse = mockCrypto;
  @Input() email: string = '';
  @Input() userBalance: number = 0;

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

  buyCrypto() {
    // Implement the logic to buy crypto
    console.log('Buying crypto...');
  }

  sellCrypto() {
    console.log('Selling crypto...')
  }
}