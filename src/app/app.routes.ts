import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BuyCryptoPageComponent } from './pages/buy-crypto/buy-crypto-page.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'buy',
    component: BuyCryptoPageComponent,
  },
  {
    path: '**',
    redirectTo: () => {
      // const authService = inject(AuthService)

      return 'home';
    },
  },
];
