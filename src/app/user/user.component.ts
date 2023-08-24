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
import { PendingInfo } from '../models/pending-info.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  type;
  duration;




  listSize;
  list = new Array();
  date: any;
  newList: [];
  size: number;
  leaveApplicationList: any;
  formattedDate;
  user: User = {
    firstname: '',
    lastname: '',
    email: '',
    dob: '',
    telephoneNo: 0,
    registeredDate: ''




  }

  pending: PendingInfo = {
    type: '',
    duration: '',
    date: '',
    createdDate: ''
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
    this.infoLeave();
    // this.hello();
    // this.getLeaveApplication();
    this.getLeaveApplications();


    // this.getPendingDate(2);
    // console.log(this.getPendingType(2));
    // console.log(this.getPendingDuration(2));
    // this.getPendingDate(2);

    // console.log(this.date)





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

        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );

  }




  public userInfo() {

    const id = this.userAuthService.getId();
    // console.log(id);


    this.employeeService.getInfoById(id).subscribe(
      (res) => {
        // console.log(res);



        this.formattedDate = this.datePipe.transform(res.dob, 'yyyy-MM-dd');
        // console.log(this.formattedDate);
        let registerdDate = this.datePipe.transform(res.registeredDate, 'yyyy-MM-dd');
        // console.log(this.formattedDate);

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
        // console.log(res);
      },
      (err) => {
        // console.log(err);
      }

    )
  }


  // public getLeaveApplication() {
  //   let id = this.userAuthService.getId()
  //   return this.employeeService.leaveApplication(id).subscribe(
  //     (res) => {
  //       // console.log("list", res);

  //       this.leaveApplicationList = res;
  //       // console.log("list", this.leaveApplicationList);
  //       // this.size = this.leaveApplicationList.length;
  //       // console.log(this.size)
  //       // this.settingList(res);

  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   )
  // }

  // getPendingDate(id) {

  //   // ldate1: any;
  //   this.employeeService.getPendingLeave(id).subscribe(
  //     (res) => {
  //       this.date = res.date
  //       this.date = this.datePipe.transform(this.date, 'yyyy-MM-dd');
  //       // console.log("ffZ" + this.date);

  //       return this.date;

  //     },
  //     (err) => {

  //       console.log(err);
  //     }



  //   );







  // }

  // settingList(list) {
  //   // console.log("ggg", list);
  //   for (let i = 0; i < list.length; i++) {

  //     // console.log("num", i);
  //     for (let j = 0; j < list[i].length; j++) {
  //       // console.log("num", this.getPendingDate(list[i][j]));
  //       this.employeeService.getPendingLeave(list[i][j]).subscribe(
  //         (res) => {
  //           console.log(res.date);



  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       )


  //     }

  //     this.newList = [this.pendingData];


  //   }

  //   console.log(this.newList);

  // }


  // getPendingType(id) {
  //   this.employeeService.getPendingLeave(id).subscribe(
  //     (res) => {
  //       this.type = res.type
  //       if (this.type === 'TYPE_CASUAL') {
  //         this.type = 'Casual';

  //       } else if (this.type === 'TYPE_SICK') {
  //         this.type = 'Sick';
  //       } else if (this.type === 'TYPE_ANNUAL') {
  //         this.type = 'Annual';
  //       }
  //       return this.type;

  //     },
  //     (err) => {

  //       console.log(err);
  //     }


  //   );



  // }


  // getPendingDuration(id) {


  //   this.employeeService.getPendingLeave(id).subscribe(
  //     (res) => {
  //       this.duration = res.duration;

  //       if (this.duration === 'ENTIRE') {
  //         this.duration = 'Entire';
  //         // console.log(this.duration);

  //       } else if (this.duration === 'HALF') {
  //         this.duration = 'Half';
  //         // console.log(this.duration);
  //       }
  //       return this.duration;

  //     },
  //     (err) => {

  //       console.log(err);
  //     }


  //   );


  // }


  getLeaveApplications() {
    let id = this.userAuthService.getId();
    this.employeeService.leaveApplicationList(id).subscribe(
      (res) => {
        console.log(res);
        this.leaveApplicationList = res;
        this.listSize = this.leaveApplicationList.length;
        console.log(this.listSize);
        for (let i = 0; i < this.listSize; i++) {

          this.list.push(0);

        }

        console.log(this.list)

      },
      (err) => {
        console.log(err);
      }
    )
  }



  public createDate(dateList: []) {


    length = dateList.length;
    console.log(dateList)
    let year = dateList[length - length];
    let month = dateList[length - 2];
    let day = dateList[length - 1];
    return year + "-" + month + "-" + day;

    // let day = dateList.get(2);
    // let month = dateList.get(1);
    // let year = dateList.get(0);
    // console.log(dateList);

    // return year + '-' + month + '-' + day;


  }





}
