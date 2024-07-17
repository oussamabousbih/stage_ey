import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProduitCatServicesService} from "../Services/Produit-Category_Services/produit-cat-services.service";
import {Product} from "../Entity/Product";
import {HttpHeaders} from "@angular/common/http";
import {map} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";

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
  products:any[]=[]
  m:any
  productImages: { [key: number]: any } = {}; // Object to store images by product ID


  constructor(private route:ActivatedRoute, private service:ProduitCatServicesService) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.m=params['navigatetrue']
      // You can then use this.id in your component to perform further actions
    });
if (this.m)
{
  this.service.getAllProducts()
   /* .pipe(
      map((products: Product[],index) => products.map((product:Product) => this.service.createimages(product)))
    )*/
    .subscribe((p :Product[])=> {
      this.products = p;
      this.loadImages()
    });





}else if (this.id){
  this.service.getProductsByCategoryId(this.id).subscribe(p=>{
      this.products=p
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

  addToCart(product: any) {

  }
}
