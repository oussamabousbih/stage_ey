import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ServiceUsersService} from "../Services/UserService/service-users.service";
import {Router} from "@angular/router";
import {User} from "../Entity/User";
import {Role} from "../Entity/Role";
import {LoginResponse} from "../Entity/LoginResponse";
import {LoginRequest} from "../Entity/LoginRequest";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  user:User=new User();
  roles: Role[] = []; // Array to hold the list of roles
  selectedRoles: Role[] = []; // Array to hold the selected roles
  userCreated: boolean = false;
  userState:boolean=false;
  constructor(    private service:ServiceUsersService
  , private router :Router) {
    this.roles = [
      { id: 4, name: 'user' }
    ];

  }
  loginrequest!:LoginRequest;


  ngOnInit(): void {
    this.loginrequest=new LoginRequest();
  }
 /* toggleRoleSelection(role: Role): void {
    const index = this.selectedRoles.indexOf(role);
    if (index === -1) {
      this.selectedRoles.push(role);
    } else {
      this.selectedRoles.splice(index, 1);
    }
  }*/
  saveUser(){
    this.user.roles = this.roles;
    this.loginrequest.password=this.user.password;
    this.loginrequest.email=this.user.email;
    this.service.SignUp(this.user).subscribe();
    this.userCreated=true;

}
navigate(){
    this.router.navigateByUrl("/login");
}
  loginCurrentuser(){
    this.service.Login(this.loginrequest).subscribe(
      (response: any) => {
        const loginResponse = response as LoginResponse;
        localStorage.setItem('token', loginResponse.jwtToken);
        console.log('Login successful');

        this.service.checkUserRole().subscribe(
          (response: any) => {
            const userRoles: string[] = response.roles;
            console.log('User roles:', userRoles);
            if (userRoles.includes('ROLE_admin')) { // Comparing with 'ROLE_admin'
              console.log('User has admin role');
              // Proceed with accessing admin resources

              this.router.navigate(['/backtemplate']);

              // Example route for admin
            }else {
              if (userRoles.includes('ROLE_user')) {

                this.userState=true;
                this.router.navigate(['/frontClient'], { queryParams: { userstate:this.userState  } });
                // Handle the case where the user does not have admin role
                /* this.router.navigate(['/backtemplate']); */// Example route for regular user
              }
            }
          },
          (error) => {
            console.error('Failed to check user role:', error);
          }
        );
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }

}
