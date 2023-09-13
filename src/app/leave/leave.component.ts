import { Component, OnInit } from '@angular/core';
import { EmpolyeeService } from '../_service/empolyee.service';
import { UserAuthService } from '../_service/user-auth.service';
import { Leave } from '../models/leave.model';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LeaveInfoComponent } from './leave-info/leave-info.component';
import Swal from 'sweetalert2';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  value: string;
  leaveList: Leave[];
  selectedOption: any;
  method: any;
  isVisible = true;
  getValue: any;
  application: [];
  selectLeave: any;
  pen = faPenSquare;
  searchText;
  leaveApplication;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20]

  setView;


  constructor(private employeeService: EmpolyeeService, private userAuthService: UserAuthService, private datePipe: DatePipe, private fb: FormBuilder, private router: Router, private dialog: MatDialog) {



  }
  ngOnInit(): void {
    this.selectedOption = "Pending Leaves";

    this.setSelectedOption();
    console.log(this.selectedOption);
    this.setView = "View more"



  }

  setForm() {
    this.selectLeave = this.fb.group(
      {
        select: ['']
      }
    )

  }

  setSelectedOption() {
    if (this.selectedOption === "Pending Leaves") {

      const id = this.userAuthService.getId();

      this.employeeService.pendingList(id).subscribe(
        (res: any) => {

          this.leaveList = res;
        },
        (erro) => {
          console.log(erro);
        }
      );

    }
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getDetails(this.selectedOption);

  }

  onTbleSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getDetails(this.selectedOption);
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
      this.isVisible = false;
    }
    else if (selectedOption === "Pending Leaves") {
      this.method = this.employeeService.pendingList(id);
      this.isVisible = true;

    }
    else if (selectedOption === "Rejected Leaves") {
      this.method = this.employeeService.disapprovedList(id);
      this.isVisible = false;
    }
    else if (selectedOption === "Deleted Leaves") {
      this.method = this.employeeService.deleteList(id);
      this.isVisible = false;
    }

    console.log(selectedOption);

    this.method.subscribe(
      (res: any) => {


        this.leaveList = res;
        for (let item of this.leaveList) {
          this.createDate(item.startDate);
        }


      },
      (err) => {
        console.log(err);

      }

    );


  }

  pendingStatus(status: string) {
    if (status === "Pending") {
      this.isVisible = true;
    }
    else {
      this.isVisible = false;
    }
    return this.isVisible;
  }


  deleteRequest(id) {

    this.employeeService.deleteRequest(id).subscribe(
      (resp) => {
        console.log(resp);

      },
      (erro) => {
        console.log(erro);
      }

    );

    this.getDetails("All Leaves");

  }



  public createDate(dateList: []) {


    length = dateList.length;
    let year = dateList[length - length];
    let month = dateList[length - 2];
    let day = dateList[length - 1];
    return year + "-" + month + "-" + day;

  }


  leaveItemSize(leaveItem: []) {
    return leaveItem.length;
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



  getLeaveList(list: any) {


    this.setView = "Show less"
    return this.leaveApplication = list;
  }



  viewEdit(leaveitems: [], id, i) {


    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = { item: leaveitems, leaveId: id, index: i };
    console.log(dialogConfig.data)


    let dialogRef = this.dialog.open(LeaveInfoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {

      this.selectedOption = "Pending Leaves";
      this.setSelectedOption();
      this.getDetails(this.selectedOption);
    })

  }


  deleteApplication(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("dddd");
        this.leaveList = [];
        this.deleteApp(id);
        this.selectedOption = "Pending Leaves";


        this.setSelectedOption();
        this.getDetails(this.selectedOption);






      }
    })
  }


  deleteApp(id) {

    this.employeeService.deleteApplication(id).subscribe(
      (res) => {
        console.log("rrr")
        this.selectedOption = "Pending Leaves";


        this.setSelectedOption();
        this.getDetails(this.selectedOption);
        console.log(res);

      },
      (err) => {
        console.log(err);
      }
    );
  }


  resetPage() {
    this.employeeService.refreshPage.subscribe(() => {
      this.getDetails("Pending Leaves");
    });

  }

  getPendingList() {

    this.employeeService.pendingList(this.userAuthService.getId()).subscribe(
      (res: any) => {
        console.log(res);
        this.leaveList = res;
      },
      (err) => {
        console.log(err);

      },
      () => {

      }
    )
  }


}
