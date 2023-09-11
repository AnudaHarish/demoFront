import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/_service/_admin/admin.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { InfoComponent } from './info/info.component';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-leave-manager',
  templateUrl: './leave-manager.component.html',
  styleUrls: ['./leave-manager.component.css']
})
export class LeaveManagerComponent implements OnInit {

  monthF;
  dayF;
  user: User = {
    firstname: '',
    lastname: ''
  }
  fullName;
  selectForm;
  selectedOption = 'Pending Leaves';
  applicationList: any[] = [];
  leaveItemSize;
  applicationId: any;
  nameList: any[] = [];
  searchText2;
  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  visibility;
  ngOnInit(): void {
    this.visibility = false;
    this.getSelectedAppliedList(this.selectedOption);


  }


  constructor(private fb: FormBuilder, private adminService: AdminService, private dialog: MatDialog) { }


  setupForm() {

    this.selectForm = this.fb.group(
      {
        select: this.selectedOption
      }
    )

  }


  selectValueHandler(event: any) {
    this.selectedOption = event.target.value;
    // console.log(this.selectedOption);
    this.getSelectedAppliedList(this.selectedOption)


    // this.getDetails(this.selectedOption);
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getSelectedAppliedList(this.selectedOption);

  }


  getSelectedAppliedList(selectedItem: any) {


    if (selectedItem === "Pending Leaves") {
      console.log(this.selectedOption);
      this.adminService.getDetailsPending().subscribe(
        (res: any) => {
          this.applicationList = res;
          console.log(this.applicationList);
          this.visibility = false;
        },
        (err) => {
          console.log(err);
        }
      );

    } if (selectedItem === "Approved Leaves") {
      this.adminService.getDetailsApproved().subscribe(
        (res: any) => {
          this.applicationList = res;
          this.visibility = true;



        },
        (err) => {
          console.log(err);
        }
      );


    } if (selectedItem === "Rejected leaves") {

      this.adminService.getDetailsRejected().subscribe(
        (res: any) => {
          this.applicationList = res;
          this.visibility = true;

        },
        (err) => {
          console.log(err);
        }
      );


    }



  }



  getLeaveItemSize(leaveItem: []) {
    this.leaveItemSize = leaveItem.length;

    return this.leaveItemSize;
  }



  onCreate(id) {
    this.applicationId = id;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    // dialogConfig.height = "60%";
    dialogConfig.id = id;
    dialogConfig.data = this.applicationId;

    this.dialog.open(InfoComponent, dialogConfig);
  }


  public getUserDetail(list) {

    for (let app of list) {
      let userId = app.userId;
      this.adminService.getInfo(userId).subscribe(
        (res: any): any => {
          this.user = res;
          this.fullName = this.user.firstname + " " + this.user.lastname;
          this.nameList.push(this.fullName);
          console.log(this.nameList);


        },
        (err) => {
          console.log(err);
        }
      );





    }


  }

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

    // let day = dateList.get(2);
    // let month = dateList.get(1);
    // let year = dateList.get(0);
    // console.log(dateList);

    // return year + '-' + month + '-' + day;


  }

  getDetails() {

    this.adminService.getDetailsPending().subscribe(
      (res: any) => {
        this.applicationList = res;
        console.log(this.applicationList);

      },
      (err) => {
        console.log(err);
      }
    );
    console.log(this.nameList);
  }


  acceptLeave(id) {
    this.adminService.accept(id).subscribe(
      (res: any): any => {
        console.log(res);

        // this.getDetails();

        // console.log("hooo")
        // this.selectedOption = "Pending Leaves";
        // this.getSelectedAppliedList(this.selectedOption);



      },
      (err) => {
        console.log(err);
      }
    );




  }



  rejectLeave(id) {
    this.adminService.reject(id).subscribe(
      (res: any): any => {
        console.log(res);


      },
      (err) => {
        console.log(err);
      }
    );
    // this.getSelectedAppliedList(this.selectedOption);




  }


  resetPage() {
    this.adminService.refreshPage.subscribe(() => {
      this.selectedOption = "Pending Leaves";
      this.getSelectedAppliedList(this.selectedOption);


    }

    )
  }


  mess(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, accept it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.acceptLeave(id);

        this.selectedOption = "Pending Leaves";
        this.getSelectedAppliedList(this.selectedOption);
        console.log(this.getDetails());
        this.getDetails();


        swalWithBootstrapButtons.fire(
          'Accepted!',
          'Leave Application has been accepted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',

        )
      }
    })
  }


  rejectMsg(id) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.rejectLeave(id);
        this.selectedOption = "Pending Leaves";
        this.getSelectedAppliedList(this.selectedOption);
        this.getDetails();

        // console.log(this.getDetails());
        swalWithBootstrapButtons.fire(
          'Rejected!',
          'Leave Application has been rejected.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',

        )
      }
    })
  }
}
