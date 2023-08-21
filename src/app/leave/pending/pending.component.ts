import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { EmpolyeeService } from 'src/app/_service/empolyee.service';
import { UserAuthService } from 'src/app/_service/user-auth.service';
import { Leave } from 'src/app/models/leave.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  pending: Leave;
  pendingList: Leave[];
  constructor(private emplyeeService: EmpolyeeService, private userAuthService: UserAuthService, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.pendingLeave();
  }

  pendingLeave() {
    const id = this.userAuthService.getId();
    this.emplyeeService.pendingList(id).subscribe(
      (res: any) => {
        this.pendingList = res;

        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
