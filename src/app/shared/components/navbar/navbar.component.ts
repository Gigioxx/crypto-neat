import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { auth, provider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../../../../firebase-config';
import { getAdditionalUserInfo, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { ButtonComponent } from "../../../components/ui/button/button.component";
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonComponent, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService) {}

  isLoggedIn = false;
  user: User | null = null;
  balance$: Observable<number> = new Observable<number>();

  ngOnInit() {
    onAuthStateChanged(auth, (user) => {
      this.isLoggedIn = !!user;
      this.user = user;
  
      if (user && user.email) {
        this.balance$ = from(this.userService.getUserBalance(user.email));
      }
    });
  }

  loginWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (getAdditionalUserInfo(result)?.isNewUser) {
          if (result.user.email) {
            this.userService.setUserBalance(result.user.email);
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