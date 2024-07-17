import { Injectable } from '@angular/core';
import { AppUser } from '../freelance/models/app-user';
import { catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Entity/User';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FooConnectedUserService {
  private apiUrl = environment.apiUrl;//${this.apiUrl}
  public currentUser : User | null =null;
  constructor(private http:HttpClient) {
      this.UpdateUsersData()

   }



   //-------------
    UpdateUsersData(){

    const token = localStorage.getItem('token');

    if (!token) {
       throwError(new Error('No token found in local storage.'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Combine URL, headers, and error handling in a single HTTP request
     this.http.get<User>(`${this.apiUrl}/getconnecteduser`, { headers ,observe:'response'})
      .pipe(
        catchError(error => {
          console.error('Error retrieving connected user:', error);
          // Handle the error gracefully, e.g., display an error message to the user
          return throwError(error);
        })
      ).subscribe( response => {
        if(response.body != null)
           this.currentUser = response.body
          console.log("*****foo-Connected-User*****: "+ this.currentUser?.id);

      });

      }
}
