import { Component, Input } from '@angular/core';
import { CryptoResponse } from '../../interfaces/crypto.interfaces';
import { mockCrypto } from '../../constants/constants';

@Component({
  selector: 'app-crypto-modal',
  standalone: true,
  imports: [],
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
}