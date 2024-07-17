import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../Entity/course';
import { Module } from '../../Entity/module';
import {User} from "../../Entity/User";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = environment.apiUrl;
  private baseURL = `${this.apiUrl}/course/getAll`;
  private addURL = `${this.apiUrl}/course/add`;
  private modulesURL = `${this.apiUrl}/module/getAll`;

  constructor(private httpClient: HttpClient) { }

  getCoursesList(): Observable<Course[]>{
    return this.httpClient.get<Course[]>(`${this.baseURL}`)
  }

  createCourse(course: FormData): Observable<object>{
    return this.httpClient.post(`${this.addURL}`, course);
  }

  getCourseById(courseId: number): Observable<Course>{
    return this.httpClient.get<Course>(`${this.apiUrl}/course/${courseId}`);
  }

  getModulesList(): Observable<Module[]> {
    return this.httpClient.get<Module[]>(this.modulesURL);
  }

  updateCourse(courseId: number, course: Course): Observable<object> {
    return this.httpClient.put(`${this.apiUrl}/course/${courseId}`, course);
  }

  deleteCourse(courseId: number): Observable<Object>{
    return this.httpClient.delete(`${this.apiUrl}/course/${courseId}`);
  }

  getFileContent(fileName: string): Observable<string> {
    const url = `${this.apiUrl}/course/files/${fileName}`;
    return this.httpClient.get(url, { responseType: 'text' });
  }


  affectercourseauser(course : number, iduser: number) {
    const url = `${this.apiUrl}/module/affectercourseauser/${iduser}/${course}`;
    return this.httpClient.put(url,{});
  }




}
