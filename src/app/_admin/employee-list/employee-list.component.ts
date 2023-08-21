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



  }



}
