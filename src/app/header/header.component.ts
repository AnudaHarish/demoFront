import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_service/user-auth.service';
import { Router } from '@angular/router';
import { UserService } from '../_service/user/user.service';
import { faHome } from '@fortawesome/free-solid-svg-icons'; '@fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'; import { LoginComponent } from '../login/login.component';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faPeopleRoof } from '@fortawesome/free-solid-svg-icons';
import { faBusinessTime } from '@fortawesome/free-solid-svg-icons';
import { User } from '../models/user.model';
import { EmpolyeeService } from '../_service/empolyee.service';
'@fontawesome';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dateTime: Date;
  user: User;
  constructor(public userAuthService: UserAuthService, public userService: UserService, private router: Router, private employeeService: EmpolyeeService) { }
  people = faPeopleRoof;
  btime = faBusinessTime;
  person = faUser;
  clock = faClock
  icon = faMessage;
  arrow = faArrowCircleRight;

  ngOnInit(): void {
    this.dateTime = new Date();
    this.userInfo();
  }

  public logout() {
    this.userAuthService.clear();
  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  opened = true;


  public userInfo() {

    let id = this.userAuthService.getId();
    this.employeeService.getInfoById(id).subscribe(
      (res) => {
        console.log(res);
        this.user = res;

      },
      (err) => {
        console.log(err);
      }
    )

  }


}
