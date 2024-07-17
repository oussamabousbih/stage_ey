import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../Entity/User";
import {GetconnecteduseridService} from "../Services/getconnecteduserid.service";
import {ChangePasswordRequest} from "../Entity/ChangePasswordRequest";
import {ServiceUsersService} from "../Services/UserService/service-users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit{


  selectedFile!: File;
  message!: string;
  user!:User;
  id!:number;

  passrequest!:ChangePasswordRequest;
  constructor(private router:Router,private service:GetconnecteduseridService,private httpClient :HttpClient,private services:ServiceUsersService) {


  }

  ngOnInit(): void {
    this.passrequest=new ChangePasswordRequest();
    }
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }


  onUpload() {
    const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token) {
      throw new Error('No token found in local storage.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // Assuming the endpoint returns the URL of the uploaded image
    console.log(this.selectedFile);

    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    //Make a call to the Spring Boot Application to save the image

    this.httpClient.post('http://localhost:8080/upload-image', uploadImageData,{headers})
      .subscribe((response:any) => {
          if (response.status === 200) {
            this.message = 'Image uploaded successfully';


          } else {
            this.message = 'Image not uploaded successfully';
          }
        }
      );

    window.location.reload();

  }



}
