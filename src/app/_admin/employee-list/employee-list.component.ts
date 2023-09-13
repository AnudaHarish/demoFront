import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdminService } from 'src/app/_service/_admin/admin.service';
import { User } from 'src/app/models/user.model';
import { InfoComponent } from '../leave-manager/info/info.component';
import { UserInfoComponent } from './user-info/user-info.component';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { SaveEmployeeComponent } from '../save-employee/save-employee.component';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  dialogRef: any;

  constructor(private adminService: AdminService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {

    this.getactive();
    this.visible = false;


  }
  option;
  searchText
  bin = faTrashCan;
  pen = faPenToSquare;
  monthF;
  dayF;
  selectedList: any;

  visible;

  getactive() {

    this.adminService.activeUserList().subscribe(
      (res: any): any => {
        console.log(res);
        this.selectedList = res;
        this.option = "Active";
      },
      (err) => {
        console.log(err);
      }
    );

    this.visible = false;


  }

  //get delete list
  DeleteList() {
    this.adminService.deletedUserList().subscribe(
      (res: any): any => {
        console.log(res);
        this.selectedList = res;
        this.visible = true;
        console.log(this.visible);
        this.option = "Deleted";
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //formatting date
  public createDate(dateList: []) {


    length = dateList.length;
    // console.log(dateList)
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

  //formating enums
  editEnum(value) {
    if (value === 'MALE') {
      return 'male';

    } else if (value === 'FEMALE') {
      return 'female';
    }
    return 'other';

  }


  //opening edit user information dialog
  editInfo(id) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    dialogConfig.data = id;

    this.dialogRef = this.dialog.open(UserInfoComponent, dialogConfig);
    this.dialogRef.afterClosed().subscribe(result => {
      this.getactive();
    });

  }



  deleteEmployee(id) {

    this.adminService.DeleteEmployee(id).subscribe(
      (res: any): any => {
        console.log(res);
        console.log("Working!!!!");
      },
      (err) => {
        console.log(err);
      }
    )
    window.location.reload();

  }

  delMsg(id) {
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
        this.deleteEmployee(id);

        console.log("deleted");
        this.selectedList = [];
        this.activeList();
        Swal.fire(
          'Deleted!',
          'Employee ' + id + ' has been deleted.',
          'success'
        )
      }
    })
  }



  addEmployee() {
    const dialogConfig2 = new MatDialogConfig();
    dialogConfig2.disableClose = true;
    dialogConfig2.autoFocus = true;
    dialogConfig2.width = "70%";
    // dialogConfig2.height = "55rem";
    this.dialogRef = this.dialog.open(SaveEmployeeComponent, dialogConfig2);
    this.dialogRef.afterClosed().subscribe(result => {
      this.getactive();
    })

  }


  //activeList
  activeList() {
    this.adminService.activeUserList().subscribe(
      (res: any): any => {
        console.log(res);
        this.selectedList = res;
      },
      (err) => {
        console.log(err);
      }
    );

  }

}
