import {Component, OnInit} from '@angular/core';
import {ServiceUsersService} from "../Services/UserService/service-users.service";
import {User} from "../Entity/User";
import {LoginRequest} from "../Entity/LoginRequest";
import {LoginResponse} from "../Entity/LoginResponse";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  listUsers!:User[];
  user!: User;
  searchedUser!:String;
  currentPage: number = 1;
  pageSize: number = 6;

  constructor(private service:ServiceUsersService) {
  }
  ngOnInit(): void {
    this.user=new User();
this.getUsers();


  }
  getUsers() {
    this.service.getUsers().subscribe(
      (users: User[]) => {
        this.listUsers = users;
        console.log('Users retrieved successfully');
      },
      (error) => {
        console.error('Failed to retrieve users:', error);
      }
    );

  }
deleteUser(id:number){
this.service.deleteUser(id).subscribe(
  ()=>{
    this.service.getUsers().subscribe(
      (users: User[]) => {
        this.listUsers = users;
        console.log('Users retrieved successfully');
      },
      (error) => {
        console.error('Failed to retrieve users:', error);
      }
    );

  }
);
}


  searchusers(seachUser:String) {
    this.service.searchUser(seachUser).subscribe((users: User[]) => {
    this.listUsers=users;
      console.log('Users '+users);

    })

  }
}
