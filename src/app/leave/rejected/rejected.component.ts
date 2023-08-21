import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EmpolyeeService } from 'src/app/_service/empolyee.service';
import { UserAuthService } from 'src/app/_service/user-auth.service';
import { Leave } from 'src/app/models/leave.model';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.css']
})
export class RejectedComponent implements OnInit {
  rejected: Leave;
  rejectedList: Leave[];
  constructor(private emplyeeService: EmpolyeeService, private userAuthService: UserAuthService, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.rejectedLeave();
  }

  rejectedLeave() {
    const id = this.userAuthService.getId();
    this.emplyeeService.disapprovedList(id).subscribe(
      (res: any) => {
        this.rejectedList = res;

        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
