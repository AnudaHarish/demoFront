import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserAuthService } from '../_service/user-auth.service';
import { EmpolyeeService } from '../_service/empolyee.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  formattedDate;
  userDetails: User;



  constructor(public userAuthService: UserAuthService, private router: Router, private employeeService: EmpolyeeService, private datePipe: DatePipe) { }




  ngOnInit(): void {

    this.userInfo();
    this.hello();


  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);

  }


  public userInfo() {

    const id = this.userAuthService.getId();
    console.log(id);


    this.employeeService.getInfoById(id).subscribe(
      (res) => {
        console.log(res);
        this.userDetails = res;
        this.formattedDate = this.datePipe.transform(this.userDetails.dob, 'yyyy-MM-dd');
        console.log(this.formattedDate);


      },
      (err) => {
        console.log(err);
      }
    )

  }

  public hello() {
    this.employeeService.hello().subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }

    )
  }





}
