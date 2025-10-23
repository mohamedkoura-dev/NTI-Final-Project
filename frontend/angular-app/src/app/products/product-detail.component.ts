import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-product-detail',
  template: `
    <div *ngIf="product">
      <h2>{{product.name}}</h2>
      <img [src]="product.imageUrl || 'https://via.placeholder.com/240'" width="240" />
      <p>{{product.description}}</p>
      <p>Price: ${{product.price}}</p>
      <button (click)="add()">Add to cart</button>
    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  product:any;
  id:string = '';
  constructor(private route: ActivatedRoute, private api: ApiService){ }
  ngOnInit(){ this.id = this.route.snapshot.paramMap.get('id') || ''; this.api.getProduct(this.id).subscribe((res:any)=> this.product = res); }
  add(){ this.api.addToCart(this.id).subscribe(()=> alert('Added to cart')); }
}
