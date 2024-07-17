import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {User} from "../../Entity/User";
import {LoginRequest} from "../../Entity/LoginRequest";
import {Role} from "../../Entity/Role";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServiceRolesService {
  private apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }
  getRoles(){
    return this.http.get<Role[]>(`${this.apiUrl}/roles/get`);
  }
  RoleADD(a:Role){
    return this.http.post(`${this.apiUrl}/add`,a);

  }
  deleteRole(id:number){
    return this.http.delete(`${this.apiUrl}/delete/`+id) ;
  }
  updateRole(a:Role){
    return this.http.put(`${this.apiUrl}/roles/update`,a);
  }
}
