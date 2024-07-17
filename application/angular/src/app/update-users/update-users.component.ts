import { Component } from '@angular/core';
import {User} from "../Entity/User";
import {Role} from "../Entity/Role";
import {ServiceUsersService} from "../Services/UserService/service-users.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-update-users',
  templateUrl: './update-users.component.html',
  styleUrls: ['./update-users.component.css']
})
export class UpdateUsersComponent {

  user!:User;
  roles: Role[] = []; // Array to hold the list of roles
  selectedRoles: Role[] = []; // Array to hold the selected roles
  updateSuccess:boolean=false;
  id!:number;
  constructor(    private service:ServiceUsersService
    , private router :Router, private route: ActivatedRoute) {
    this.roles = [
      { id: 3, name: 'admin' },
      { id: 4, name: 'user' },
    ];

  }



  ngOnInit(): void {
    this.user=new User();
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      // You can then use this.id in your component to perform further actions
    });
    this.service.getUserById(this.id).subscribe(
      (users: User) => {

        this.user = users;
        this.user.password="";

      }
    );


  }
  toggleRoleSelection(role: Role): void {
    const index = this.selectedRoles.indexOf(role);
    if (index === -1) {
      this.selectedRoles.push(role);
    } else {
      this.selectedRoles.splice(index, 1);
    }
  }
  updateUser(){
    this.user.roles = this.selectedRoles;
    this.service.updateUser(this.user).subscribe(()=>{
      this.updateSuccess=true;
    });

  }
  navigate(){
    this.router.navigateByUrl("/backtemplate/users");
  }
}
