import { Component, OnInit } from '@angular/core';
import { EmpolyeeService } from '../_service/empolyee.service';
import { UserAuthService } from '../_service/user-auth.service';
import { Leave } from '../models/leave.model';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


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
  isVisible = false;
  getValue: any;

  selectLeave: any;





  constructor(private employeeService: EmpolyeeService, private userAuthService: UserAuthService, private datePipe: DatePipe, private fb: FormBuilder, private router: Router) {



  }
  ngOnInit(): void {
    this.selectedOption = "All Leaves"
    this.setSelectedOption();
    console.log(this.selectedOption);



  }

  setForm() {
    this.selectLeave = this.fb.group(
      {
        select: ['']
      }
    )

  }

  setSelectedOption() {
    if (this.selectedOption === "All Leaves") {
      this.selectedOption = "All Leaves";
      const id = this.userAuthService.getId();
      console.log('hee');

      this.employeeService.allLeaves(id).subscribe(
        (res: any) => {
          console.log(res);
          this.leaveList = res;
        },
        (erro) => {
          console.log(erro);
        }
      );

    }
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
    else if (selectedOption === "All Leaves") {
      this.method = this.employeeService.allLeaves(id);
    }

    console.log(selectedOption);


    console.log(this.value);
    this.method.subscribe(
      (res: any) => {


        this.leaveList = res;
        console.log(res);

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






}
