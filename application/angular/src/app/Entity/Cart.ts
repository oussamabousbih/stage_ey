import {User} from "./User";
import {CartItem} from "./CartItem";

export class Cart {
  id: number;
  user: User;
  items: CartItem[];

  constructor(id: number, user: User, items: CartItem[]) {
    this.id = id;
    this.user = user;
    this.items = items;
  }
}
