import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../Entity/course';
import { CourseService } from '../Services/CourseAndModuleServices/course.service';
import { Module } from '../Entity/module';
import { ModuleService } from '../Services/CourseAndModuleServices/module.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  protected aFormGroup!: FormGroup;
  course: Course = new Course();
  modules: Module[] = [];
  selectedFile: File | undefined;

  constructor(private moduleService: ModuleService,
              private courseService: CourseService,
              private router: Router,
              private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
    this.loadModules();
  }

  siteKey:string = "6LfT-8QpAAAAAHzfstM3iey1u9gKkw4ZyNzfkpTF";

  loadModules() {
    this.moduleService.getModulesList().subscribe(
      (data: Module[]) => {
        this.modules = data;
        // Initialize course with the first module
        if (this.modules.length > 0) {
          this.course.module = this.modules[0];
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveCourse() {
    const formData = new FormData();
    formData.append('file', this.selectedFile as Blob);
    formData.append('course', JSON.stringify(this.course));

    this.courseService.createCourse(formData).subscribe(data => {
        console.log(data);
        this.goToCourseList();
      },
      error => console.log(error));
  }

  goToCourseList() {
    this.router.navigate(['/backtemplate/courses']);
  }

  onSubmit() {
    console.log(this.course);
    this.saveCourse();
  }
}
