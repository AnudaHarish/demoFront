import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user/user.service';
import { UserAuthService } from '../_service/user-auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';






@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any;

  calender = faCalendar;
  lock = faLock;
  user = faUser;

  isSubmitted = false;
  constructor(private userService: UserService, private userAuthService: UserAuthService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {

  }

  login(loginInfo: NgForm) {


    this.userService.login(loginInfo.value).subscribe(
      (res: any) => {
        this.userAuthService.setRoles(res.roles);
        this.userAuthService.setToken(res.accessToken);
        this.userAuthService.setId(res.id);
        this.userAuthService.setusername(res.username);
        console.log(res);

        const role = res.roles[0];

        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/user']);
        } else {
          // this.router.navigate(['/user']);
        }

        // console.log(res);

      },
      (err) => {
        console.log(err);
      }
    );


  }

  signup(signupForm: NgForm) {

    const formattedDate = this.datePipe.transform(signupForm.value.dob, 'yyyy-MM-dd');


    const payload = {

      firstname: signupForm.value.firstname,
      lastname: signupForm.value.lastname,
      dob: formattedDate,
      email: signupForm.value.email,
      username: signupForm.value.username,
      password: signupForm.value.password,
      gender: signupForm.value.gender


    };
    console.log(payload.dob);
    console.log(signupForm.value.dob);

    this.userService.signup(payload).subscribe(

      (resp: any) => {

        console.log(resp);

      },
      (err) => {
        console.log(err);
      }


    );

    this.isSubmitted = true;
    this.router.navigate(['/login']);




  }


}
