import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {query} from "@angular/animations";
import {ServiceUsersService} from "../../Services/UserService/service-users.service";
import {GetconnecteduseridService} from "../../Services/getconnecteduserid.service";
import {User} from "../../Entity/User";


@Component({
  selector: 'app-front-template',
  templateUrl: './front-template.component.html',
  styleUrls: ['./front-template.component.css']
})
export class FrontTemplateComponent implements OnInit{
  isloggedin=true;
  profileOff:boolean=true;
 /* profileOn:boolean=false;*/
  changepass:boolean=false;
  navigatetrue:boolean=true;
  user:User|null=null;
  constructor(private route:Router ,private routes : ActivatedRoute ,private serviceUser : GetconnecteduseridService) {


  }

  navigate(){
  this.route.navigateByUrl("/login");
  this.isloggedin=false;
}
  navigateto(){
    this.route.navigateByUrl("/frontClient/login");
    this.isloggedin=false;
  }
  navigatetoCourses(){
    this.route.navigate(['/frontClient/coursesFront'], { queryParams: { navigatetrue:this.navigatetrue  } });
    this.navigatetrue=false;
  }

  userState:boolean=false;

  ngOnInit(): void {
    this.routes.queryParams.subscribe(params => {
      this.userState = params['userstate'] === 'true';
      this.changepass= params['changepass'] === 'true';
      // You can then use this.id in your component to perform further actions
    });
    if (this.userState){
      this.profileOff=false;
    /*  this.profileOn=true;*/

    }
    if(this.changepass){
      this.isloggedin=false;
    }
    this.serviceUser.getConnectedUserObject().subscribe((u)=>{
      this.user=u;
      console.log("nomuser"+this.user.name);


    });
  }


}
