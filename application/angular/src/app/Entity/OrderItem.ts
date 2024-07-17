import {Product} from "./Product";
import {Order} from "./Order";

export class OrderItem {
  id: number;
  order: Order;
  product: Product;
  quantity: number;

  constructor(id: number, order: Order, product: Product, quantity: number) {
    this.id = id;
    this.order = order;
    this.product = product;
    this.quantity = quantity;
  }
}
