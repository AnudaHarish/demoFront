import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_service/_admin/admin.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {


  }
  selectedList: [];

  visible = true;

  getactive() {

    this.adminService.activeUserList().subscribe(
      (res) => {
        console.log(res);
        this.selectedList = res;
      },
      (err) => {
        console.log(err);
      }
    );

    this.visible = true;


  }


  DeleteList() {
    this.adminService.deletedUserList().subscribe(
      (res) => {
        console.log(res);
        this.selectedList = res;
        this.visible = false;
        console.log(this.visible);
      },
      (err) => {
        console.log(err);
      }
    );





  }



}
