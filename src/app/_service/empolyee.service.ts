import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Leave } from '../models/leave.model';
import { User } from '../models/user.model';
import { LeaveInfo } from '../models/leave-info.model';
import { PendingInfo } from '../models/pending-info.model';
import { PendingApplication } from '../models/pending-application.model';

@Injectable({
  providedIn: 'root'
})
export class EmpolyeeService {


  constructor(private userAuthService: UserAuthService, private http: HttpClient) { }


  private _refreshPage = new Subject<void>();
  get refreshPage() {
    return this._refreshPage;
  }

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
    return this.http.get(`${this.baseUrl}/approvedApplicationList/${id}`);
  }

  public disapprovedList(id) {
    return this.http.get(`${this.baseUrl}/rejectedApplicationList/${id}`);
  }

  public allLeaves(id) {
    return this.http.get(`${this.baseUrl}/leaves/${id}`);
  }

  public addRequest(pendingApplication: PendingApplication) {
    return this.http.post(this.baseUrl + "/addRequest", pendingApplication)
      .pipe(
        tap(() => {
          this._refreshPage.next();
        })
      );

  }

  public deleteRequest(id) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);

  }
  public deleteList(id) {
    return this.http.get(`${this.baseUrl}/deleted/${id}`);

  }

  public leaveInfo(id): Observable<LeaveInfo> {
    return this.http.get<LeaveInfo>(`${this.baseUrl}/infoLeave/${id}`);
  }

  public leaveApplication(id) {
    return this.http.get(`${this.baseUrl}/pending/${id}`);
  }

  public getPendingLeave(id): Observable<PendingInfo> {
    return this.http.get<PendingInfo>(`${this.baseUrl}/getPendingLeave/${id}`);
  }


  public leaveApplicationList(id) {
    return this.http.get(`${this.baseUrl}/pending/${id}`);
  }


  public getPendingLeaveDate(id) {
    return this.http.get(`${this.baseUrl}/alreadyAppliedDates/${id}`);
  }

  public checkAppyDate(id, dateList: any) {
    return this.http.post(`${this.baseUrl}/checkDates/${id}`, dateList);
  }


  public ckeckLeavesItem(ckeckApp: PendingApplication) {
    return this.http.post(`${this.baseUrl}/checkLeaveItem`, ckeckApp);
  }

  public updateUser(id, user) {
    return this.http.put(`${this.baseUrl}/updateUser/${id}`, user);
  }

  public updateApplication(updateRequest) {
    return this.http.put(`${this.baseUrl}/updatingApplication`, updateRequest);
  }


  public deleteApplication(id) {
    return this.http.put(`${this.baseUrl}/deleteApp`, id);
  }











}
