import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {User} from "../../Entity/User";
import {LoginRequest} from "../../Entity/LoginRequest";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {ChangePasswordRequest} from "../../Entity/ChangePasswordRequest";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ServiceUsersService {
  images: string[] = [];
  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl;
  public userId:number|null=null;


  SignUp(a:User){
    return this.http.post(`${this.apiUrl}/signup`,a);

  }

  Login(a:LoginRequest){

    return this.http.post(`${this.apiUrl}/login`,a);

  }
  checkUserRole(): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token) {
      throw new Error('No token found in local storage.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/login/role`, { headers }).pipe(
      tap(response => console.log('Response from getUserRole:', response)));
  }
  deleteUser(id:number){
    const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token) {
      throw new Error('No token found in local storage.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/user/delete/`+id,{ headers }) ;
  }
  updateUser(a:User){
    const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token) {
      throw new Error('No token found in local storage.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/user/update`,a, { headers });
  }
  sendEmail(email: string) {
    // Check if the email address is in a valid format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      console.error('Invalid email address');

    }

    const requestBody = { email };
    return this.http.post(`${this.apiUrl}/email/password-reset-request`, requestBody);
  }
  loadImage(imagename:any){
    const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token) {
      throw new Error('No token found in local storage.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //Make a call to Sprinf Boot to get the Image Bytes.
    return this.http.get(`${this.apiUrl}/getimage/` + imagename,{headers})
  }
  uploadimage(uploadImageData:any){
    const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token) {
      throw new Error('No token found in local storage.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/upload-image`, uploadImageData,{headers})
  }

  getUserById(id:number){

      const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token) {
      throw new Error('No token found in local storage.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/user/get/`+id, { headers })

  }
  ChangepassRequest(a:ChangePasswordRequest){
    const urlParams = new URLSearchParams(window.location.search); // Get URL parameters
    const token = urlParams.get('token'); // Extract the 'token' parameter

    if (!token) {
      throw new Error('No token found in URL.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this.apiUrl}/change/pass`,a, { headers });
  }
  ChangeCurrentpassRequest(a:ChangePasswordRequest){
    const urlParams = new URLSearchParams(window.location.search); // Get URL parameters
    const token = urlParams.get('token'); // Extract the 'token' parameter

    if (!token) {
      throw new Error('No token found in URL.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/change/change-current-pass`,a, { headers });
  }
getConnectedUser(){

  const token = localStorage.getItem('token'); // Retrieve token from storage

  if (!token) {
    throw new Error('No token found in local storage.');
  }

  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get(`${this.apiUrl}/email/getconnecteduser`, { headers });
}






  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token) {
      throw new Error('No token found in local storage.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(`${this.apiUrl}/user/get`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  searchUser(name:String):any {
    const token = localStorage.getItem('token'); // Retrieve token from storage

    if (!token) {
      throw new Error('No token found in local storage.');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<User[]>(`${this.apiUrl}/user/searchUser/`+name, { headers });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
