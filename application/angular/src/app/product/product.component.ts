import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProduitCatServicesService} from "../Services/Produit-Category_Services/produit-cat-services.service";
import {Product} from "../Entity/Product";
import {HttpHeaders} from "@angular/common/http";
import {map} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {CartsItemService} from "../Services/CartServices/carts-item.service";
import {CartItem} from "../Entity/CartItem";
import {GetconnecteduseridService} from "../Services/getconnecteduserid.service";
import {User} from "../Entity/User";
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  currentPage: number = 1;
  pageSize: number = 6;
  message!: string;
  id:any
  idcart:number
  user:User=new User
  products:any[]=[]
  cartitem!:CartItem
  m:any
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  productImages: { [key: number]: any } = {}; // Object to store images by product ID


  constructor(private route:ActivatedRoute, private service:ProduitCatServicesService
              ,private servicecart:CartsItemService ,private router:Router
              , private userservice:GetconnecteduseridService) {
  }
  ngOnInit(): void {
    this.userservice.getConnectedUserObject().subscribe(u=>{
      this.user=u

      this.idcart=this.user.cart.id
    })
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.m=params['navigatetrue']
      // You can then use this.id in your component to perform further actions
    });
    this.cartitem= new CartItem()
    this.cartitem.quantity=1

if (this.m)
{
  this.service.getAllProducts()
   /* .pipe(
      map((products: Product[],index) => products.map((product:Product) => this.service.createimages(product)))
    )*/
    .subscribe((p :Product[])=> {
      this.products = p;
      this.filteredProducts = p;
      this.loadImages()
    });





}else if (this.id){
  this.service.getProductsByCategoryId(this.id).subscribe(p=>{
      this.products=p
    this.filteredProducts = p;
    this.loadImages()

    }
  )
}


  }
  loadImages(): void {
    this.products.forEach(product => {
      this.service.getimage(product.id).subscribe(
        (data) => {
          this.createImageFromBlob(product.id, data);
        },
        (error) => {
          console.error('Error fetching image: ', error);
        }
      );
    });
  }




  createImageFromBlob(productId: number, image: Blob): void {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
      this.productImages[productId] = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  showSuccessModal(): void {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  addToCart(idprod: number) {

    this.servicecart.getAllCartItems(this.idcart).subscribe((items: CartItem[]) => {
      // Check if the product is already in the cart
      const itemExists = items.some(item => item.productt.id === idprod);

      if (itemExists) {
        alert("Product already added !!!");
      }
    else {
        this.servicecart.createCartItem(this.cartitem, idprod, this.idcart)
          .subscribe(
            response => {
              this.showSuccessModal();
              console.log('CartItem created successfully', response);
            },
            error => {
              console.error('Error creating CartItem', error);
            }
          );
      }
    })
  }


  onSearchQueryChange(): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
