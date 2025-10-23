import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div style="max-width:900px;margin:auto;padding:16px;">
      <h1>Student E-Commerce (Angular)</h1>
      <nav>
        <a routerLink="/">Products</a> |
        <a routerLink="/cart">Cart</a> |
        <a routerLink="/login">Login</a> |
        <a routerLink="/register">Register</a>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}
