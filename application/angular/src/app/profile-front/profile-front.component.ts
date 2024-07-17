import {Component, OnInit} from '@angular/core';
import {User} from "../Entity/User";
import {ServiceUsersService} from "../Services/UserService/service-users.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GetconnecteduseridService} from "../Services/getconnecteduserid.service";

@Component({
  selector: 'app-profile-front',
  templateUrl: './profile-front.component.html',
  styleUrls: ['./profile-front.component.css']
})
export class ProfileFrontComponent implements OnInit{
  selectedFile!: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  imageName: any;
  user!:User;
  id!:number;

  constructor(public service:GetconnecteduseridService,private httpClient :HttpClient) {


  }

  ngOnInit(): void {
    this.user=new User();
this.service.getConnectedUserObject().subscribe((u:any) => {
  this.user = u;
  this.imageName=u.image.name;
  this.getImage(this.imageName);
});
  }

  //Gets called when the user clicks on retieve image button to get the image from back end
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

}
