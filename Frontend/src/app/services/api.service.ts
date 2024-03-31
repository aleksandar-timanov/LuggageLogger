import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<any> {
    return this.http.get('http://localhost:8080/users');
  }

  public createUser(userData: User): Observable<Object> {
    console.log(userData)
    return this.http.post<User>('http://localhost:8080/users', userData);
  }


}
