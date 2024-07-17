import {Category} from "./Category";
import {ImageModel} from "./ImageModel";

export class Product {
  id!: number;
  name!: string;
  description!:string
  price!: number;
  category!: Category;
  image!: ImageModel | null;

}
