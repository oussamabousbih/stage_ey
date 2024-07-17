import {Component, OnInit} from '@angular/core';
import {Product} from "../Entity/Product";
import {Category} from "../Entity/Category";
import {ProduitCatServicesService} from "../Services/Produit-Category_Services/produit-cat-services.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-addproduct-back',
  templateUrl: './addproduct-back.component.html',
  styleUrls: ['./addproduct-back.component.css']
})
export class AddproductBackComponent implements OnInit{
  selectedFile!: File;
  product:Product=new Product();
  categories:Category[]=[];
  message!: string;
  selectedCategoryId!: number;
  successMessage: string = '';

  constructor(private productService: ProduitCatServicesService,private httpClient:HttpClient,private route:Router,private router:ActivatedRoute) { }

  ngOnInit(): void {

    this.productService.getAllCategories().subscribe(categories=>{
      this.categories=categories;
    })
  }

  navigate(){
    this.route.navigateByUrl("/backtemplate/produitback")
  }
  addproduct() {
    this.productService.addProduct(this.product, this.selectedCategoryId).subscribe(
      (response: any) => {
        console.log('Product added successfully:', response);
        this.successMessage = 'Product added successfully!';
        // Optionally reset form after successful submission
        // Resetting the product object or any form clearing logic can be placed here

        // Navigate to the next page with product ID as query parameter
        this.route.navigate(['/backtemplate/upload'], { queryParams: { id: response.id } });
      },
      (error: any) => {
        console.error('Error adding product:', error);
        // Handle error cases here
      }
    );
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    this.onUpload()
  }


  onUpload() {

    // Assuming the endpoint returns the URL of the uploaded image
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    //Make a call to the Spring Boot Application to save the image
    this.productService.uploadimage(uploadImageData,this.product.id)

    window.location.reload();

  }




}
