import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EmpolyeeService } from 'src/app/_service/empolyee.service';
import { UserAuthService } from 'src/app/_service/user-auth.service';
import { Leave } from 'src/app/models/leave.model';

@Component({
  selector: 'app-approved',
  templateUrl: './approved.component.html',
  styleUrls: ['./approved.component.css']
})
export class ApprovedComponent implements OnInit {

  approved: Leave;
  approvedList: Leave[];
  constructor(private emplyeeService: EmpolyeeService, private userAuthService: UserAuthService, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.approvedLeave();
  }

  approvedLeave() {
    const id = this.userAuthService.getId();
    this.emplyeeService.approvedList(id).subscribe(
      (res: any) => {
        this.approvedList = res;

        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
