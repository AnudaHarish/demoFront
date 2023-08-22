import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Leave } from '../models/leave.model';
import { User } from '../models/user.model';
import { LeaveInfo } from '../models/leave-info.model';

@Injectable({
  providedIn: 'root'
})
export class EmpolyeeService {


  constructor(private userAuthService: UserAuthService, private http: HttpClient) { }

  baseUrl = "http://localhost:8080/api/user";

  public getInfoById(id): Observable<User> {

    return this.http.get<User>(`${this.baseUrl}/info/${id}`);
  }

  public hello(): any {

    return this.http.get(this.baseUrl + '/hello');
  }


  public pendingList(id): Observable<Leave[]> {
    return this.http.get<Leave[]>(`${this.baseUrl}/pending/${id}`);
  }

  public approvedList(id) {
    return this.http.get(`${this.baseUrl}/approved/${id}`);
  }

  public disapprovedList(id) {
    return this.http.get(`${this.baseUrl}/disapproved/${id}`);
  }

  public allLeaves(id) {
    return this.http.get(`${this.baseUrl}/leaves/${id}`);
  }

  public addRequest(leave: []) {
    return this.http.post(this.baseUrl + "/add" + "/request", leave);

  }

  public deleteRequest(id) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);

  }

  public leaveInfo(id): Observable<LeaveInfo> {
    return this.http.get<LeaveInfo>(`${this.baseUrl}/infoLeave/${id}`);
  }







}
