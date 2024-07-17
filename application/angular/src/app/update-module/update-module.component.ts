import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Module } from '../Entity/module';
import {ModuleService} from "../Services/CourseAndModuleServices/module.service";


@Component({
  selector: 'app-update-module',
  templateUrl: './update-module.component.html',
  styleUrls: ['./update-module.component.css']
})
export class UpdateModuleComponent implements OnInit {
  moduleId!: number;
  module: Module = new Module();

  constructor(private moduleService: ModuleService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.moduleId = +params['moduleId'];
      console.log('moduleId:', this.moduleId);
      if (!isNaN(this.moduleId)) {
        this.moduleService.getModuleById(this.moduleId).subscribe(
          (data: Module) => {
            this.module = data;
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.error('Invalid moduleId:', this.moduleId);
      }
    });
  }

  onSubmit() {
    console.log('Submitting update for module:', this.module);
    this.moduleService.updateModule(this.moduleId, this.module).subscribe(
      data => {
        console.log('Update successful:', data);
        this.goToModuleList();
      },
      error => console.error('Update failed:', error)
    );
  }

  goToModuleList(){
    this.router.navigate(['/backtemplate/modules']);
  }
}
