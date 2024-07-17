import {Component, OnInit} from '@angular/core';
import {ModuleService} from "../Services/CourseAndModuleServices/module.service";
import {CourseService} from "../Services/CourseAndModuleServices/course.service";
import {Module} from "../Entity/module";
import {Course} from "../Entity/course";
import {ServiceUsersService} from "../Services/UserService/service-users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../Entity/User";
import {GetconnecteduseridService} from "../Services/getconnecteduserid.service";

@Component({
  selector: 'app-courses-front',
  templateUrl: './courses-front.component.html',
  styleUrls: ['./courses-front.component.css']
})

export class CoursesFrontComponent implements OnInit{
  modules: Module[] = [];
  course: Course = new Course();
  showPopup: boolean = false;
  selectedModule: Module | null = null;
  currentPage: number = 1;
  pageSize: number = 3;
  showAddCoursePopup: boolean = false;
  selectedFile: File | undefined;
  user!:any;
  id!:number;
  constructor(private routerav:Router ,private moduleService: ModuleService,
               private courseService: CourseService,private service:ServiceUsersService,private route :ActivatedRoute, private httpClient:HttpClient,private serviceuser:GetconnecteduseridService) {
  }

  ngOnInit(): void {
    this.moduleService.getModulesList().subscribe((data: Module[]) => {
      this.modules = data;
    });
    this.user=new User();
  this.serviceuser.getConnectedUserObject().subscribe((u:User)=>{
    this.user=u;

  });
  }

  openAddCoursePopup(): void {
    this.showAddCoursePopup = true;
  }

  closeAddCoursePopup(): void {
    this.showAddCoursePopup = false;
  }

  showCoursesPopup(event: MouseEvent, module: Module): void {
    event.preventDefault();
    this.selectedModule = module;
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  getFileUrl(attachmentFileName: string): string {
    return `http://localhost:8080/course/files/${attachmentFileName}`;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveCourse() {
    const formData = new FormData();
    formData.append('file', this.selectedFile as Blob);
    formData.append('course', JSON.stringify(this.course));

    this.courseService.createCourse(formData).subscribe((data:any) => {
      this.course=data
      console.log("user",this.user.id)
        console.log("course",this.course.courseId)
        this.courseService.affectercourseauser(this.course.courseId,this.user.id).subscribe();
        console.log(data);
      },
      error => console.log(error));
  }

  onSubmit() {
    console.log(this.course);
      this.saveCourse();
      window.location.reload()

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

}
