import {Component, OnInit} from '@angular/core';
import {ServiceUsersService} from "../Services/UserService/service-users.service";
import {Router} from "@angular/router";
import {User} from "../Entity/User";
import {ChangePasswordRequest} from "../Entity/ChangePasswordRequest";

@Component({
  selector: 'app-change-pass-request',
  templateUrl: './change-pass-request.component.html',
  styleUrls: ['./change-pass-request.component.css']
})
export class ChangePassRequestComponent implements OnInit{
  passrequest!:ChangePasswordRequest;
  passwordChanged:boolean=false;
  constructor(private service:ServiceUsersService,private route:Router) {
  }

  ngOnInit(): void {
    this.passrequest=new ChangePasswordRequest();
  }

  changepass(){

    this.service.ChangepassRequest(this.passrequest).subscribe(

    );
    this.passwordChanged=true;
  }
navigate(){
    this.route.navigateByUrl("/login")
}
}
