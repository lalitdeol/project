import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { User } from './user';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor( private http: HttpClient) {

   }
   getpostdata(){
     let url= "https://jsonplaceholder.typicode.com/posts";
     return this.http.get(url)
   }

   register(user: User) {
    return this.http.post(`/users/register`, user);
}

getAll() {
  return this.http.get<User[]>(`/users`);
}
getById(id: number) {
  return this.http.get(`/users/` + id);
}

login(email: string, password: string) {
  return this.http.post<any>(`/users/authenticate`, { email: email, password: password })
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
          }

          return user;
      }));
}

logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
}


}
