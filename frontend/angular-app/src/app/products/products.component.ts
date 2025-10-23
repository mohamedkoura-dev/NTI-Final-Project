import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-products',
  template: `
    <div>
      <input [(ngModel)]="q" placeholder="Search products" />
      <button (click)="load()">Search</button>
      <div *ngFor="let p of products" style="border:1px solid #ddd;padding:8px;margin:8px 0;display:flex;gap:8px;">
        <img [src]="p.imageUrl || 'https://via.placeholder.com/120'" width="120" height="90" />
        <div>
          <h3><a [routerLink]="['/product', p._id]">{{p.name}}</a></h3>
          <p>{{p.description}}</p>
          <p>Price: ${{p.price}}</p>
          <button (click)="add(p._id)">Add to cart</button>
        </div>
      </div>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  products:any[] = [];
  q:string = '';
  constructor(private api: ApiService) {}
  ngOnInit(){ this.load(); }
  load(){ this.api.getProducts(this.q).subscribe((res:any)=> this.products = res); }
  add(id:string){ this.api.addToCart(id).subscribe(()=> alert('Added to cart')); }
}
