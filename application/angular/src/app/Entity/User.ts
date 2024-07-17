import {Role} from "./Role";
import {ImageModel} from "./ImageModel";
import {Cart} from "./Cart";
import {Order} from "./Order";
import {Course} from "./course";


export class User {
  id!: number;
  name!: string;
  password!: string;
  email!: string;
  image!:ImageModel;
  roles!: Role[];
  cart!: Cart;
  courses !: Course[];
  orders!: Order[];

}


