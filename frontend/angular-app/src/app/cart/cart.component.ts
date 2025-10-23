import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  template: `
    <div>
      <h2>Your Cart</h2>
      <div *ngIf="cart?.items?.length; else empty">
        <div *ngFor="let it of cart.items" style="border:1px solid #ddd;padding:8px;margin:8px 0;">
          <h4>{{it.product.name}}</h4>
          <p>Qty: {{it.qty}}</p>
          <p>Price: ${{it.product.price}}</p>
          <button (click)="remove(it.product._id)">Remove</button>
        </div>
        <button (click)="checkout()">Place Order</button>
      </div>
      <ng-template #empty><p>Cart is empty</p></ng-template>
    </div>
  `
})
export class CartComponent implements OnInit {
  cart:any = {};
  constructor(private api: ApiService){}
  ngOnInit(){ this.load(); }
  load(){ this.api.getCart().subscribe((res:any)=> this.cart = res); }
  remove(id:string){ this.api.removeFromCart(id).subscribe(()=> this.load()); }
  checkout(){ this.api.placeOrder().subscribe(()=> { alert('Order placed'); this.load(); }); }
}
