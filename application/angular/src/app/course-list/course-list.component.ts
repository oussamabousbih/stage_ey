import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../Entity/course';
import { CourseService } from '../Services/CourseAndModuleServices/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit{
  courses!: Course[];
  fileContent: string = '';

  constructor(private courseService: CourseService,
              private router: Router){}

  ngOnInit(): void {
    this.getCourses();
  }

  private getCourses(){
    this.courseService.getCoursesList().subscribe(data => {
      this.courses = data;
    })
  }

  updateCourse(courseId: number){
    this.router.navigate(['/backtemplate/update-course',courseId]);
  }

  deleteCourse(courseId: number){
    this.courseService.deleteCourse(courseId).subscribe( data => {
      console.log(data);
      this.getCourses();
    })
  }

  getFileUrl(attachmentFileName: string): string {
    return `http://localhost:8080/course/files/${attachmentFileName}`;
  }


  previewFile(fileUrl: string) {
    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        window.open(blobUrl, '_blank');
      })
      .catch(error => {
        console.error('Error fetching file:', error);
      });
  }

  getFileType(attachmentFileName: string): string {
    const extension = attachmentFileName.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') {
      return 'pdf';
    } else {
      return 'text';
    }
  }
  navigate(){
    this.router.navigateByUrl("/backtemplate/create-course")
  }

}
