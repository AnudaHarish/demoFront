import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { AppDeatails } from 'src/app/models/app-deatails.model';
import { EditEmployee } from 'src/app/models/edit-employee.model';
import { Leave } from 'src/app/models/leave.model';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private _refreshPage = new Subject<void>();
  private baseUrl: string | undefined;


  constructor(private http: HttpClient) {
    this.baseUrl = environment.domain + "manager";
  }


  get refreshPage() {
    return this._refreshPage;
  }


  // baseUrl = "http://localhost:8080/api/manager";



  public activeUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/activeList`);
  }

  public deletedUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/deleteList`);
  }

  public getAllPendings() {
    return this.http.get(`${this.baseUrl}/pendingList`);
  }

  public findName(id) {
    return this.http.get(`${this.baseUrl}/findName/${id}`);
  }

  public AcceptList() {
    return this.http.get(`${this.baseUrl}/acceptList`);
  }

  public rejectedtList() {
    return this.http.get(`${this.baseUrl}/rejectList`);

  }

  public reject(id) {
    return this.http.put(`${this.baseUrl}/reject`, id);
  }

  public accept(id) {
    return this.http.put(`${this.baseUrl}/accept`, id);

  }

  public getLeaveApplication(id): Observable<Leave> {
    return this.http.get<Leave>(`${this.baseUrl}/application/${id}`);
  }


  public getUserInfo(id): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/searchUser/${id}`);
  }


  public getInfo(id): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/getUser/${id}`);
  }

  public getDetailsPending(): Observable<AppDeatails> {
    return this.http.get<AppDeatails>(`${this.baseUrl}/newPendingList`);
  }
  public getDetailsRejected(): Observable<AppDeatails> {
    return this.http.get<AppDeatails>(`${this.baseUrl}/newRejectList`);
  }

  public getDetailsApproved(): Observable<AppDeatails> {
    return this.http.get<AppDeatails>(`${this.baseUrl}/newApprovedList`);
  }

  public EditEmployee(details: EditEmployee) {
    return this.http.put(`${this.baseUrl}/updateEmployee`, details);
  }


  public DeleteEmployee(id) {
    return this.http.put(`${this.baseUrl}/deleteUser`, id);
  }












}
