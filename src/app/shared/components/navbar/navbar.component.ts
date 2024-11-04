import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { auth, provider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../../../../firebase-config';
import { getAdditionalUserInfo, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { Firestore, getDocs, collection, query, where, setDoc, doc } from '@angular/fire/firestore';
import { ButtonComponent } from "../../../components/ui/button/button.component";
import { CommonModule } from '@angular/common';
import { generateRandomNumber } from '../../../utils/generateRandomNumber';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonComponent, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  constructor(private firestore: Firestore) {}

  isLoggedIn = false;
  user: User | null = null;
  balance: number = 0;

  ngOnInit() {
    onAuthStateChanged(auth, (user) => {
      this.isLoggedIn = !!user;
      this.user = user;
  
      if (user && user.email) {
        this.fetchUserBalance(user.email);
      }
    });
  }
  
  async fetchUserBalance(email: string) {
    const usersBalanceCollection = collection(this.firestore, 'usersBalance');

    const q = query(usersBalanceCollection, where('userEmail', '==', email));
    
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      this.balance = doc.data()['balance'];
    });
  }

  async setUserBalance(email: string) {
    const docRef = await setDoc(doc(this.firestore, `usersBalance/${email}`), {
      balance: generateRandomNumber(100, 100000),
      userEmail: email,
    });
  }

  loginWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (getAdditionalUserInfo(result)?.isNewUser) {
          if (result.user.email) {
            this.setUserBalance(result.user.email);
          }
        }
      })
      .catch((error) => {
        console.error('Error during sign in:', error);
      });
  }

  loginWithEmail(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log('User signed in:', result.user);
      })
      .catch((error) => {
        console.error('Error during sign in:', error);
      });
  }

  signUpWithEmail(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log('User signed up:', result.user);
      })
      .catch((error) => {
        console.error('Error during sign up:', error);
      });
  }

  logout() {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
      })
      .catch((error) => {
        console.error('Error during sign out:', error);
      });
  }
}