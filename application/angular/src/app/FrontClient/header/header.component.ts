import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {query} from "@angular/animations";
import {ServiceUsersService} from "../../Services/UserService/service-users.service";
import {GetconnecteduseridService} from "../../Services/getconnecteduserid.service";
import {User} from "../../Entity/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProduitCatServicesService} from "../../Services/Produit-Category_Services/produit-cat-services.service";
import {Category} from "../../Entity/Category";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  profileOff:boolean=true;
  navigatetrue:boolean=true;
  user:User|null=null;
  id!:number;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  imageName: any;
  showCat: boolean = false;

  categories:Category[]=[]
  constructor(private route:Router , private routes : ActivatedRoute
              , protected serviceUser : GetconnecteduseridService
              , private httpClient :HttpClient
                ,private catservice:ProduitCatServicesService) {


  }

  navigate(){
    this.route.navigateByUrl("/login");
  }
  navigateto(){
    this.route.navigateByUrl("/frontClient/login");
  }
  navigatetoProducts(){
    this.route.navigate(['/frontClient/product'], { queryParams: { navigatetrue:this.navigatetrue  } });
    this.navigatetrue=false;
  }


  ngOnInit(): void {
this.catservice.getAllCategories().subscribe(categ=>{
  this.categories=categ
  console.log("categ printed suceesffully")
})
    const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token || token === "null") {
      this.profileOff = true;
    } else {
      this.profileOff = false;
    }

    this.serviceUser.getConnectedUserObject().subscribe((u)=>{
      this.user=u;
      this.imageName=u.image.name;
      this.getImage(this.imageName);
    });

  }
  logout() {
    localStorage.setItem('token','');
    this.route.navigateByUrl("");
    this.profileOff=true;

  }
  getImage(imagename :string) {
    const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token) {
      throw new Error('No token found in local storage.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/getimage/' + imagename,{headers})
      .subscribe(res => {

          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  showCategories() {
    this.showCat = true;
  }

  hideCategories() {
    this.showCat = false;
  }

  navigateToCategory(categoryId: number): void {
    // Navigates to /frontClient/product?id=categoryId
    this.route.navigate(['/frontClient/product'], { queryParams: { id: categoryId } })
      .then(() => {
        // Reloads the current route to apply queryParams
        window.location.reload();
      });
  }

}
