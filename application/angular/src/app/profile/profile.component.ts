import {Component, OnInit} from '@angular/core';
import {ServiceUsersService} from "../Services/UserService/service-users.service";
//@ts-ignore
import { saveAs } from 'file-saver';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {User} from "../Entity/User";
import {Router} from "@angular/router";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  imageName: any;
  user!:User;
  id!:number;
  constructor(private service:ServiceUsersService,private httpClient :HttpClient,private router:Router) {


  }

  ngOnInit(): void {
    this.user=new User();
    this.service.getConnectedUser().subscribe((idd:any)=>{
      this.id=idd;
      this.service.getUserById(this.id).subscribe(
        (u: any)  => {

          this.user = u;
          this.imageName=u.image.name;
          this.getImage(this.imageName);


        }
      );
    });


  }
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }
  //Gets called when the user clicks on retieve image button to get the image from back end
  getImage(imagename :string) {
    this.service.loadImage(imagename)
      .subscribe(res => {

          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  onUpload(){


    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    //Make a call to the Spring Boot Application to save the image
    this.service.uploadimage(uploadImageData)

      .subscribe((response:any) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';
          } else {
            this.message = 'Image not uploaded successfully';
          }
        }
      );

this.gotoprofile()
  }


  gotoprofile() {
    this.router.navigateByUrl("/backtemplate/profile");
    window.location.reload()
  }

}


