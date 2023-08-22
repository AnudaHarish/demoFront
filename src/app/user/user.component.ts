import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserAuthService } from '../_service/user-auth.service';
import { EmpolyeeService } from '../_service/empolyee.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { Chart, scales } from 'chart.js/auto';
import { UserService } from '../_service/user/user.service';
import { LeaveInfo } from '../models/leave-info.model';

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

  info: LeaveInfo = {
    sick: 0,
    casual: 0,
    annual: 0
  }
  mobile = faMobileScreenButton;
  at = faAt;



  constructor(public userAuthService: UserAuthService, private router: Router, private employeeService: EmpolyeeService, private datePipe: DatePipe, private userService: UserService) { }




  ngOnInit(): void {

    this.userInfo();
    this.infoLeave()
    this.hello();




  }

  public chart(info: LeaveInfo) {

    const ctx = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Casual', 'Sick', 'Annual'],
        datasets: [{
          label: '# No of Leaves',
          data: [this.info.casual, this.info.sick, this.info.annual],

          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }

        }
      }
    });

  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);

  }


  public infoLeave() {
    let id = this.userAuthService.getId();

    this.employeeService.leaveInfo(id).subscribe(

      (res) => {
        this.info.annual = res.annual;
        this.info.casual = res.casual;
        this.info.sick = res.sick;
        this.chart(this.info);

        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );

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
