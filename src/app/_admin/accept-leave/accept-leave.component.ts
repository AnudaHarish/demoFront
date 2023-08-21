import { Component, OnInit } from '@angular/core';
import { faChainSlash, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from 'src/app/_service/_admin/admin.service';
import { EmpolyeeService } from 'src/app/_service/empolyee.service';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-accept-leave',
  templateUrl: './accept-leave.component.html',
  styleUrls: ['./accept-leave.component.css']
})
export class AcceptLeaveComponent implements OnInit {

  check = faCircleCheck;
  ban = faBan;
  info = faCircleInfo;
  list;
  name;

  constructor(private employeeService: EmpolyeeService, private adminService: AdminService) {

  }

  ngOnInit(): void {

  }

  pendingList() {

    this.adminService.getAllPendings().subscribe(
      (res) => {
        console.log(res);
        this.list = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }


  findName(id) {
    this.adminService.findName(id).subscribe(
      (res) => {
        console.log(res);
        this.name = res;

      },
      (err) => {
        console.log(err);
      }
    );




  }


  getAcceptList() {
    this.adminService.AcceptList().subscribe(
      (res) => {
        console.log(res);
        this.list = res;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getRejectList() {
    this.adminService.rejectedtList().subscribe(
      (res) => {
        console.log(res);
        this.list = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  reject(id) {
    this.adminService.reject(id).subscribe(
      (res) => {
        console.log(res);

      },
      (err) => {
        console.log(err);
      }
    );
  }

  accept(id) {
    this.adminService.accept(id).subscribe(
      (res) => {
        console.log(res);

      },
      (err) => {
        console.log(err);
      }
    );
  }








}
