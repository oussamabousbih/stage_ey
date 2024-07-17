import {User} from "./User";
import {OrderItem} from "./OrderItem";

export class Order {
  id: number;
  user: User;
  orderDate: Date;
  items: OrderItem[];

  constructor(id: number, user: User, orderDate: Date, items: OrderItem[]) {
    this.id = id;
    this.user = user;
    this.orderDate = orderDate;
    this.items = items;
  }
}
