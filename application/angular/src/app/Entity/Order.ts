import {User} from "./User";
import {OrderItem} from "./OrderItem";
import {Product} from "./Product";

export class Order {
  id: number;
  orderDate: Date;
  users!: User;  // Adjust according to your user model
  products!: any[];  // Adjust according to your product model
  prix:any;
}
