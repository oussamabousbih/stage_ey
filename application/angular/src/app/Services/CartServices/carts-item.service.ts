import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {CartItem} from "../../Entity/CartItem";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cart} from "../../Entity/Cart";

@Injectable({
  providedIn: 'root'
})
export class CartsItemService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  createCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/cart/add`, cart);
  }

  getCartById(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/cart/${id}`);
  }

  getAllCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/cart`);
  }

  updateCart(id: number, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/cart/update/${id}`, cart);
  }

  deleteCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart/delete/${id}`);
  }


  createCartItem(cartItem: CartItem, idprod: number, idcart: number): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/cartitem/add/${idprod}/${idcart}`, cartItem);
  }

  getCartItemById(id: number): Observable<CartItem> {
    return this.http.get<CartItem>(`${this.apiUrl}/cartitem/${id}`);
  }

  getAllCartItems(idcart:number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/cartitem/cart/${idcart}`);
  }

  updateCartItem(id: number, cartItem: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.apiUrl}/cartitem/update/${id}`, cartItem);
  }

  deleteCartItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cartitem/delete/${id}`);
  }
  order(){
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError(new Error('No token found in local storage.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/cartitem/email`, {} ,{headers})
  }

  getallorders():Observable<any>{

    return this.http.get<any>(`${this.apiUrl}/cartitem/orders`)
  }
  deleteOrder(id:any){
   return this.http.delete<void>(`${this.apiUrl}/cartitem/orders/delete/${id}`);
}
}
