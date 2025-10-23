import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  template: `
    <h2>Register</h2>
    <form (submit)="register($event)">
      <div><input name="name" placeholder="name" [(ngModel)]="name"/></div>
      <div><input name="email" placeholder="email" [(ngModel)]="email"/></div>
      <div><input name="password" placeholder="password" type="password" [(ngModel)]="password"/></div>
      <button type="submit">Register</button>
    </form>
  `
})
export class RegisterComponent {
  name=''; email=''; password='';
  constructor(private api: ApiService, private router: Router){}
  register(e:Event){ e.preventDefault();
    this.api.register({ name:this.name, email:this.email, password:this.password }).subscribe((res:any)=> {
      localStorage.setItem('token', res.token);
      alert('Registered');
      this.router.navigateByUrl('/');
    }, err=> alert('Register failed'));
  }
}
