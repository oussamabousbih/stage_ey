import {Cart} from "./Cart";
import {Product} from "./Product";

export class CartItem {
  id: number;
  product: Product;
  cart: Cart;
  quantity: number;

  constructor(id: number, product: Product, cart: Cart, quantity: number) {
    this.id = id;
    this.product = product;
    this.cart = cart;
    this.quantity = quantity;
  }
}
