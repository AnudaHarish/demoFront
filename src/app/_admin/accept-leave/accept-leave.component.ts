import { Component, OnInit } from '@angular/core';
import { faChainSlash, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { AdminService } from 'src/app/_service/_admin/admin.service';
import { EmpolyeeService } from 'src/app/_service/empolyee.service';
import { faBan } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { UserAuthService } from 'src/app/_service/user-auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-accept-leave',
  templateUrl: './accept-leave.component.html',
  styleUrls: ['./accept-leave.component.css']
})
export class AcceptLeaveComponent implements OnInit {

  value: string;
  check = faCircleCheck;
  ban = faBan;
  info = faCircleInfo;
  list;
  name;
  selectedOption;
  method;

  selectLeave;
  leaveList: [];

  constructor(private employeeService: EmpolyeeService, private adminService: AdminService, private userAuthService: UserAuthService, private fb: FormBuilder) {

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

  setForm() {
    this.selectLeave = this.fb.group(
      {
        select: ['']
      }
    )

  }


  selectChangedHandler(event: any) {
    this.selectedOption = event.target.value;
    console.log(this.selectedOption);


    this.getDetails(this.selectedOption);
  }



  getDetails(selectedOption: string) {


    const id = this.userAuthService.getId();

    if (selectedOption === "Approved Leaves") {
      this.method = this.employeeService.approvedList(id);
    }
    else if (selectedOption === "Pending Leaves") {
      this.method = this.employeeService.pendingList(id);

    }
    else if (selectedOption === "Rejected Leaves") {
      this.method = this.employeeService.disapprovedList(id);
    }
    else if (selectedOption === "Deleted Leaves") {
      this.method = this.employeeService.deleteList(id);
    }

    console.log(selectedOption);


    // console.log(this.value);
    this.method.subscribe(
      (res: any) => {


        this.leaveList = res;
        // console.log(this.leaveList);
        // for (let item of this.leaveList) {
        //   this.createDate(item.startDate);
        // }


      },
      (err) => {
        console.log(err);

      }

    );


  }



  public createDate(dateList: []) {


    length = dateList.length;
    // console.log(dateList)
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
