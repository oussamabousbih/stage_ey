import {Component, OnInit} from '@angular/core';
import {Product} from "../Entity/Product";
import {ProduitCatServicesService} from "../Services/Produit-Category_Services/produit-cat-services.service";
import {Category} from "../Entity/Category";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-productback',
  templateUrl: './productback.component.html',
  styleUrls: ['./productback.component.css']
})
export class ProductbackComponent implements OnInit{
  retrievedImage: any;
  imageToShow!:any
  base64Data: any;
  retrieveResonse: any;
  imageName: any;
  selectedFile!: File;
  product:Product=new Product();
  products:Product[]=[];
  message!: string;
  selectedCategoryId!: number;
  successMessage: string = '';
  searchedProduct: any;
  currentPage: number = 1;
  pageSize: number = 6;
  productImages: { [key: number]: any } = {}; // Object to store images by product ID

  constructor(private productService: ProduitCatServicesService,private httpClient:HttpClient,private route:Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(pro=>{
      this.products=pro;
      this.loadImages()
    })

  }


  deleteProduct(id:any) {
this.productService.deleteProduct(id).subscribe(()=>{
  this.productService.getAllProducts().subscribe(pro=>{
    this.products=pro;

  })
  console.log("product succefully deleted ")

  }
)
    window.location.reload()
  }

  searchProducts(searchedProduct: any) {

  }

  navigatetoaddproduct() {
    this.route.navigateByUrl("/backtemplate/addproduct")
  }



  loadImages(): void {
    this.products.forEach(product => {
      this.productService.getimage(product.id).subscribe(
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


}
