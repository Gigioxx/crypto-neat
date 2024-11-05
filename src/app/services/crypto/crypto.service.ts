import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addDoc, collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { buySellCryptoPayload } from '../../interfaces/crypto.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private firestore: Firestore) {}

  buyCrypto(payload: buySellCryptoPayload): Observable<any> {
    return new Observable(observer => {
      const validationError = this.validateTransaction(payload.userBalance, payload.cryptoAmount, payload.currentPrice, 'buy');

      if (validationError) {
        observer.error(validationError);
        return;
      }

      // Simulate API call with 3s timeout
      setTimeout(async () => {
        try {
          await this.updateUserBalance(payload.email, payload.userBalance - (payload.currentPrice * payload.cryptoAmount));
          await this.createTransaction('buy', payload);
          console.log('transacción creada');
          
          observer.next({ success: true });
          observer.complete();
        } catch (error) {
          observer.error('Error processing transaction');
        }
      }, 3000);
    });
  }

  sellCrypto(payload: buySellCryptoPayload): Observable<any> {
    return new Observable(observer => {

      const validationError = this.validateTransaction(payload.userBalance, payload.cryptoAmount, payload.currentPrice, 'sell');
      if (validationError) {
        observer.error(validationError);
        return;
      }

      // Simulate API call with 3s timeout
      setTimeout(async () => {
        try {
          await this.updateUserBalance(payload.email, payload.userBalance + (payload.currentPrice * payload.cryptoAmount));
          await this.createTransaction('sell', payload);
          
          observer.next({ success: true });
          observer.complete();
        } catch (error) {
          observer.error('Error processing transaction');
        }
      }, 3000);
    });
  }

  private validateTransaction(userBalance: number, amount: number, currentPrice: number, action: string): string | null {
    if (Math.random() < 0.1) {
      return 'Request failed';
    }

    if (amount < 0) {
      return 'Invalid amount';
    }

    if (action === 'buy' && currentPrice * amount > userBalance) {
      return 'Insufficient balance';
    }

    return null;
  }

  private async updateUserBalance(email: string, newBalance: number): Promise<void> {
    const usersBalanceCollection = collection(this.firestore, 'usersBalance');
    await setDoc(doc(this.firestore, `usersBalance/${email}`), {
      balance: newBalance,
      userEmail: email,
    });
  }

  private async createTransaction(action: 'buy' | 'sell', payload: buySellCryptoPayload): Promise<void> {
    const transactionsCollection = collection(this.firestore, 'transactionHistory');
    await addDoc(transactionsCollection, {
      action,
      crypto: payload.crypto,
      price: payload.currentPrice,
      balanceUsed: payload.currentPrice * payload.cryptoAmount,
      userEmail: payload.email,
      date: new Date().toISOString(),
      quantity: payload.cryptoAmount,
    });
    console.log('transacción creada');
  }
}