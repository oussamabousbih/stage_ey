import {Component, OnInit} from '@angular/core';
import {CartsItemService} from "../Services/CartServices/carts-item.service";
import {GetconnecteduseridService} from "../Services/getconnecteduserid.service";
import {User} from "../Entity/User";
import {CartItem} from "../Entity/CartItem";
import {Product} from "../Entity/Product";
import {of} from "rxjs";

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit{

user!:User
  cartid:number
  cartitems:CartItem[]
  userconnnected:boolean=true
  produit!:Product
  somme:any=0
  email:any
  currentsomme:any=0
  constructor(private cartservice:CartsItemService,private userservice:GetconnecteduseridService) {


  }

  ngOnInit(): void {
   /* const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token || token === "null") {
      this.userconnnected = false;
    } else {
      this.userconnnected = true;
    }*/

    this.userservice.getConnectedUserObject().subscribe(u => {
      this.user = u;
      this.email=u.email
      this.cartid = u.cart?.id; // Use optional chaining to handle possible null/undefined values
      console.log('this is the cart id ' + this.cartid);
      this.loadcart(this.cartid)
    })


  }

loadcart(cart:any){
  this.cartservice.getAllCartItems(cart).subscribe(c => {
      this.cartitems = c;
    this.sommeprice()
      this.cartitems.forEach((item, index) => {
        console.log(`Item ${index}:`, item);
        console.log(`Product ${index}:`, item.productt);
        console.log(`Product Name ${index}:`, item.productt?.name);
        this.produit=item.productt
        console.log("product addedd"+this.produit)

      }, error => {
        console.error('Failed to load cart items', error);
      });
    }
  );
}
  increaseQuantity(idcartitem:number,cartItem:CartItem): void {
    cartItem.quantity += 1;
    this.cartservice.updateCartItem(idcartitem,cartItem).subscribe(()=>{
        this.sommeprice()

      }

    );
  }

  decreaseQuantity(idcartitem: number,cartItem:CartItem): void {
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
      this.cartservice.updateCartItem(idcartitem,cartItem).subscribe(res=>{
        this.sommeprice()

      });
    }
  }

  sommeprice() {
    this.somme = 0; // Initialize somme to 0
    for (let item of this.cartitems) {
      if (item.productt && item.productt.price) {
        this.somme += item.productt.price * item.quantity;  // Accumulate the total price
      }
    }
  }
  finishOrder(): void {
    this.cartservice.order().subscribe(res=>{
      alert('Order Confirmed Check Your Email \n Your Total Order Price is :'+this.somme+"$")

    })
  }
}
