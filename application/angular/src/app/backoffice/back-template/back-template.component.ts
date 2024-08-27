import {Component, OnInit} from '@angular/core';
import {ServiceUsersService} from "../../Services/UserService/service-users.service";
import {User} from "../../Entity/User";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-back-template',
  templateUrl: './back-template.component.html',
  styleUrls: ['./back-template.component.css']
})
export class BackTemplateComponent implements OnInit{
  user!:any;
  id!:number;
  userImageUrl: any;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message!: string;
  imageName: any;
  constructor(private service:ServiceUsersService,private route :ActivatedRoute, private httpClient:HttpClient,private router :Router) {
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
  getImage(imagename :string) {

    this.service.loadImage(imagename)
      .subscribe(res => {

          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  logout() {
    localStorage.setItem('token','');
    this.router.navigateByUrl("");

  }
}
