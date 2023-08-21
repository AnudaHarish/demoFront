import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserAuthService } from '../_service/user-auth.service';
import { EmpolyeeService } from '../_service/empolyee.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  formattedDate;
  user: User = {
    firstname: '',
    lastname: '',
    email: '',
    dob: '',
    telephoneNo: 0,
    registeredDate: ''


  }
  mobile = faMobileScreenButton;
  at = faAt;



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



        this.formattedDate = this.datePipe.transform(res.dob, 'yyyy-MM-dd');
        console.log(this.formattedDate);
        let registerdDate = this.datePipe.transform(res.registeredDate, 'yyyy-MM-dd');
        console.log(this.formattedDate);

        this.user.firstname = res.firstname;
        this.user.lastname = res.lastname;
        this.user.email = res.email;
        this.user.dob = this.formattedDate;
        this.user.registeredDate = registerdDate;
        this.user.telephoneNo = res.telephoneNo;



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
