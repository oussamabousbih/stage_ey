import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../Entity/User";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GetconnecteduseridService {
  private apiUrl = environment.apiUrl;
  public connecteduserProperty:User|null=null
  constructor(private http: HttpClient) { }
  public getConnectedUserObject(): Observable<User>{
    const token = localStorage.getItem('token');

    if (!token) {
      return throwError(new Error('No token found in local storage.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    /*// trash
    this.http.get<User>('http://localhost:8080/getconnecteduser', { headers })
      .pipe(
        catchError(error => {
          console.error('Error retrieving connected user:', error);
          // Handle the error gracefully, e.g., display an error message to the user
          return throwError(error);
        })
      ).subscribe((u)=>{
        this.connecteduserProperty=u;
    });*/
    //end-trash

    // Combine URL, headers, and error handling in a single HTTP request
    return this.http.get<User>(`${this.apiUrl}/getconnecteduser`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error retrieving connected user:', error);
          // Handle the error gracefully, e.g., display an error message to the user
          return throwError(error);
        })
      );
  }


}
