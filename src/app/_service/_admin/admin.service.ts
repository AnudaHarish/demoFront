import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:8080/api/manager";



  public activeUserList(): any {
    return this.http.get(`${this.baseUrl}/activeUser`);
  }
}
