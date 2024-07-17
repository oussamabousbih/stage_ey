import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from '../Entity/module';
import { ModuleService } from '../Services/CourseAndModuleServices/module.service';
import {ServiceUsersService} from "../Services/UserService/service-users.service";
import {User} from "../Entity/User";

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit{

  modules!: Module[];
listUsers!: User[];
  constructor(private moduleService: ModuleService,
    private router: Router,private service:ServiceUsersService) {}

  ngOnInit(): void {
    console.log("ngOnInit called");
    this.getModules();
    this.service.getUsers().subscribe(
      (data: User[])=>this.listUsers= data);
}

private getModules(){
    this.moduleService.getModulesList().subscribe(data => {
        console.log("Received data:", data);
        this.modules = data;
    });
}

updateModule(moduleId: number){
  this.router.navigate(['/backtemplate/update-module',moduleId]);
}

deleteModule(moduleId: number){
  this.moduleService.deleteModule(moduleId).subscribe( data => {
    console.log(data);
    this.getModules();
  })
}

}
