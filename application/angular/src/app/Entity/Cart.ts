import {User} from "./User";
import {CartItem} from "./CartItem";

export class Cart {
  id!: number;
  user!: User;
  items!: CartItem[];

}
