import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Module } from '../Entity/module';
import { ModuleService } from '../Services/CourseAndModuleServices/module.service';

@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.css']
})
export class CreateModuleComponent implements OnInit {
  module: Module = new Module();
  constructor(private moduleService: ModuleService,
    private router: Router) {}

  ngOnInit(): void{
  }

  saveModule(){
    this.moduleService.createModule(this.module).subscribe( data =>{
      console.log(data);
      this.goToModuleList();
    },
    error => console.log(error));
  }

  goToModuleList(){
    this.router.navigate(['/backtemplate/modules']);
  }

  onSubmit(){
    console.log(this.module);
    this.saveModule();
  }
}
