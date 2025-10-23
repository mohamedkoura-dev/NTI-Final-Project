import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  template: `
    <h2>Login</h2>
    <form (submit)="login($event)">
      <div><input name="email" placeholder="email" [(ngModel)]="email"/></div>
      <div><input name="password" placeholder="password" type="password" [(ngModel)]="password"/></div>
      <button type="submit">Login</button>
    </form>
  `
})
export class LoginComponent {
  email = ''; password = '';
  constructor(private api: ApiService, private router: Router){}
  login(e:Event){ e.preventDefault();
    this.api.login({ email:this.email, password:this.password }).subscribe((res:any)=> {
      localStorage.setItem('token', res.token);
      alert('Logged in');
      this.router.navigateByUrl('/');
    }, err=> alert('Login failed'));
  }
}
