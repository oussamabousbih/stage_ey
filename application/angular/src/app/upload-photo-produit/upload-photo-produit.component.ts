import {Component, OnInit} from '@angular/core';
import {Product} from "../Entity/Product";
import {Category} from "../Entity/Category";
import {ProduitCatServicesService} from "../Services/Produit-Category_Services/produit-cat-services.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-upload-photo-produit',
  templateUrl: './upload-photo-produit.component.html',
  styleUrls: ['./upload-photo-produit.component.css']
})
export class UploadPhotoProduitComponent implements OnInit{

  selectedFile!: File;
  product:Product=new Product();
  categories:Category[]=[];
  message!: string;
  selectedCategoryId!: number;
  successMessage: string = '';
  id:any

  constructor(private productService: ProduitCatServicesService,private httpClient:HttpClient,private route:Router,private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      this.id = params['id'];
      // You can then use this.id in your component to perform further actions
    });
  }

  navigate(){
    this.route.navigateByUrl("/backtemplate/produitback")
  }
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }


  onUpload() {

    // Assuming the endpoint returns the URL of the uploaded image
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    //Make a call to the Spring Boot Application to save the image
    this.productService.uploadimage(uploadImageData,this.id)
    this.route.navigateByUrl("/backtemplate/produitback")



  }

}
