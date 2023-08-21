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

  public deletedUserList(): any {
    return this.http.get(`${this.baseUrl}/deleteList`);
  }

  public getAllPendings() {
    return this.http.get(`${this.baseUrl}/pendingList`)
  }

  public findName(id) {
    return this.http.get(`${this.baseUrl}/findName/${id}`)
  }

  public AcceptList() {
    return this.http.get(`${this.baseUrl}/acceptList`)
  }

  public rejectedtList() {
    return this.http.get(`${this.baseUrl}/rejectedList`)

  }

  public reject(id) {
    return this.http.get(`${this.baseUrl}/rejecting/${id}`)
  }

  public accept(id) {
    return this.http.get(`${this.baseUrl}/accepting/${id}`)
  }








}
