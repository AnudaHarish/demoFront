import { Component, Input, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/_service/_admin/admin.service';
import { LeaveRequest } from 'src/app/models/leave-request.model';
import { Leave } from 'src/app/models/leave.model';
import { User } from 'src/app/models/user.model';



@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private adminService: AdminService) {

  }

  ngOnInit(): void {

    this.getApplication(this.applicationId);
    this.getUsername(this.applicationId);
  }
  monthF;
  dayF;
  applicationId = this.data;
  application: Leave = {
    leaveItem: [],
    userId: 0,
  };
  user: User = {
    firstname: '',
    lastname: '',
    email: '',
    telephoneNo: '',

  };

  leaveItem: LeaveRequest = {
    type: '',
    duration: '',
    date: ''
  }



  getApplication(id) {
    this.adminService.getLeaveApplication(id).subscribe(
      (res) => {
        this.application = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getUsername(id) {
    this.adminService.getUserInfo(id).subscribe(
      (res): any => {
        console.log(res);
        this.user = res;

      },
      (err) => {
        console.log(err);
      }
    )
  }



  public createDate(dateList: []) {

    length = dateList.length;
    let year = dateList[length - length];
    this.monthF = dateList[length - 2];


    if (this.monthF < 10) {
      this.monthF = '0' + this.monthF;
    }
    this.dayF = dateList[length - 1];
    if (this.dayF < 10) {
      this.dayF = '0' + this.dayF;
    }
    return year + "-" + this.monthF + "-" + this.dayF;

  }

  converEnum(type: string) {

    if (type === "TYPE_CASUAL") {
      type = "Casual";
      return type;
    } else if (type === "TYPE_ANNUAL") {
      type = "Annual";
      return type;
    } else if (type === "TYPE_SICK") {
      type = "Sick";
      return type;
    } else if (type === "HALF") {
      type = "Half Day";
      return type;
    } else {
      type = "Full Day";
      return type;
    }
  }





}
