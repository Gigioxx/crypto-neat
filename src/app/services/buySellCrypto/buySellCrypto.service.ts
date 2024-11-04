import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addDoc, collection, Firestore, getDocs, where } from '@angular/fire/firestore';
import { buySellCryptoPayload } from '../../interfaces/crypto.interfaces';
import { query } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class buySellCryptoService {

  constructor(private firestore: Firestore) {}


  buyCrypto({user, userBalance, crypto, amount, currentPrice}: buySellCryptoPayload): Observable<any> {
    return new Observable(observer => {
      if (Math.random() < 0.1) {
        observer.error('Request failed');
        return;
      }

      if (amount < 0) {
        observer.error('Invalid amount');
        return;
      }

      if (currentPrice * amount > userBalance) {
        observer.error('Insufficient balance');
        return;
      }

      // Simulate API call with 3s timeout
      setTimeout(async () => {
        const usersBalanceCollection = collection(this.firestore, 'usersBalance');
        const docRefBalance = await addDoc(usersBalanceCollection, {
          balance: userBalance - currentPrice * amount,
          userEmail: user.email,
        });

        const transactionsCollection = collection(this.firestore, 'transactionHistory');
        const docRefTransaction = await addDoc(transactionsCollection, {
          action: 'buy',
          crypto,
          price: currentPrice,
          balanceUsed: currentPrice * amount,
          userEmail: user.email,
          date: new Date().toISOString(),
          quantity: amount,
        });
        
        observer.next({ success: true });
        observer.complete();
      }, 3000);
    });
  }

  sellCrypto({user, userBalance, crypto, amount, currentPrice}: buySellCryptoPayload): Observable<any> {
    return new Observable(observer => {
      if (Math.random() < 0.1) {
        observer.error('Request failed');
        return;
      }

      if (amount < 0) {
        observer.error('Invalid amount');
        return;
      }

      // Simulate API call with 3s timeout
      setTimeout(async() => {
        const usersBalanceCollection = collection(this.firestore, 'usersBalance');
        const docRefBalance = await addDoc(usersBalanceCollection, {
          balance: userBalance + (currentPrice * amount),
          userEmail: user.email,
        });

        const transactionsCollection = collection(this.firestore, 'transactionHistory');
        const docRefTransaction = await addDoc(transactionsCollection, {
          action: 'sell',
          crypto,
          price: currentPrice,
          balanceUsed: currentPrice * amount,
          userEmail: user.email,
          date: new Date().toISOString(),
          quantity: amount,
        });

        observer.next({ success: true });
        observer.complete();
      }, 3000);
    });
  }
}