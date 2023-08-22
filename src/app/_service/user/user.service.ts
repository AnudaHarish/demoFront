import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../user-auth.service';
import { LeaveInfo } from 'src/app/models/leave-info.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private userAuthService: UserAuthService) { }



  baseUrl = "http://localhost:8080/api/auth";
  requestHeader = new HttpHeaders(
    { "No-Auth": "True" }
  )

  public login(loginData: NgForm) {
    return this.http.post(this.baseUrl + '/signin', loginData, { headers: this.requestHeader });
  }

  public signup(signupData: any) {
    return this.http.post(this.baseUrl + '/signup', signupData, { headers: this.requestHeader });
  }


  public roleMatch(allowedRoles: any): any {
    let isMatch = false;

    const role: any = this.userAuthService.getRoles();

    if (role != null && role) {
      for (let i = 0; i < role.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (role[i] === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }





}
