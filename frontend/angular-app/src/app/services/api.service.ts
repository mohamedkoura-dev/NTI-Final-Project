import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class ApiService {
  private API = 'http://localhost:5000/api';
  constructor(private http: HttpClient) {}
  private authHeaders() {
    const token = localStorage.getItem('token');
    return token ? { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token }) } : {};
  }
  // Auth
  register(data:any){ return this.http.post(this.API + '/auth/register', data); }
  login(data:any){ return this.http.post(this.API + '/auth/login', data); }
  // Products
  getProducts(q:any = ''){ return this.http.get(this.API + '/products' + (q ? '?search='+encodeURIComponent(q): '')); }
  getProduct(id:string){ return this.http.get(this.API + '/products/' + id); }
  createProduct(data:any){ return this.http.post(this.API + '/products', data, this.authHeaders()); }
  // Cart
  getCart(){ return this.http.get(this.API + '/cart', this.authHeaders()); }
  addToCart(productId:string, qty:number=1){ return this.http.post(this.API + '/cart/add', { productId, qty }, this.authHeaders()); }
  removeFromCart(productId:string){ return this.http.post(this.API + '/cart/remove', { productId }, this.authHeaders()); }
  // Orders
  placeOrder(){ return this.http.post(this.API + '/orders', {}, this.authHeaders()); }
  getOrders(){ return this.http.get(this.API + '/orders', this.authHeaders()); }
}
