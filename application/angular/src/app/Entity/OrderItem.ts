import {Product} from "./Product";
import {Order} from "./Order";

export class OrderItem {
  id!: number;
  order!: Order;
  product!: Product;
  quantity!: number;

}
