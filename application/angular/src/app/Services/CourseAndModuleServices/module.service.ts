import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from '../../Entity/module';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl = environment.apiUrl;
  private baseURL = `${this.apiUrl}/module/getAll`
  private addURL = `${this.apiUrl}/module/add`

  constructor(private httpClient: HttpClient) { }
  getModulesList(): Observable<Module[]>{
    const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token) {
      throw new Error('No token found in local storage.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Module[]>(`${this.baseURL}`,{headers})
  }

  createModule(module: Module): Observable<object>{
    const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token) {
      throw new Error('No token found in local storage.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.post(`${this.addURL}`, module,{headers});
  }

  getModuleById(moduleId: number): Observable<Module>{
    const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token) {
      throw new Error('No token found in local storage.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<Module>(`${this.apiUrl}/module/${moduleId}`,{headers});
  }

  updateModule(moduleId: number, module: Module): Observable<object> {
    const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token) {
      throw new Error('No token found in local storage.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.put(`${this.apiUrl}/module/${moduleId}`, module,{headers});
  }

  deleteModule(moduleId: number): Observable<Object>{
    const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token) {
      throw new Error('No token found in local storage.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.delete(`${this.apiUrl}/module/${moduleId}`,{headers});
  }
}
