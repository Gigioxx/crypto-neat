import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, where, query, setDoc, doc } from '@angular/fire/firestore';
import { generateRandomNumber } from '../../utils/generateRandomNumber';
import { userTransactionsList } from '../../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: Firestore) {}

  async setUserBalance(email: string) {
    const docRef = await setDoc(doc(this.firestore, `usersBalance/${email}`), {
      balance: generateRandomNumber(100, 100000),
      userEmail: email,
    });
  }

  async getUserBalance(email: string) {
    let balance = 0;
    const usersBalanceCollection = collection(this.firestore, 'usersBalance');
    const q = query(usersBalanceCollection, where('userEmail', '==', email));
    
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      balance = doc.data()['balance'];
    }
    return balance;
  }

  async getUserTransactions(email: string): Promise<userTransactionsList> {
    const transactions: any[] = [];
    const usersTransactionsCollection = collection(this.firestore, 'usersTransactions');
    const q = query(usersTransactionsCollection, where('userEmail', '==', email));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      transactions.push(doc.data());
    });
    return transactions;
  }
}