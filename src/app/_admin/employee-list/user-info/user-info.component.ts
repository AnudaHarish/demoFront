import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/_service/_admin/admin.service';
import { EditEmployee } from 'src/app/models/edit-employee.model';
import { User } from 'src/app/models/user.model';
import { EditComponent } from 'src/app/user/edit/edit.component';
import Swal from 'sweetalert2';
import { idText } from 'typescript';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private adminService: AdminService, public dialogRef: MatDialogRef<EditComponent>) { }
  ngOnInit(): void {
    this.setUpForm();
    this.getUser();



    console.log(this.telephoneNo);
    console.log(this.email)
  }

  form: any;
  userId = this.data;
  user: User;
  details: EditEmployee = {
    id: 0,
    telephoneNo: '',
    email: ''
  }


  getUser() {
    this.adminService.getInfo(this.userId).subscribe(
      (res: any) => {

        this.user = res;
        console.log(this.user.telephoneNo);
        this.setValueForm(this.user);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  setUpForm() {

    this.form = this.fb.group({
      telephoneNo: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      email: ['', [Validators.required, Validators.email]],

    })



  }

  get email() {
    return this.form.get('email');
  }

  get telephoneNo() {
    return this.form.get('telephoneNo')
  }

  save() {


    this.details.email = this.form.value.email;
    this.details.id = this.userId;
    this.details.telephoneNo = this.form.value.telephoneNo;
    this.adminService.EditEmployee(this.details).subscribe(
      (res: any): any => {
        console.log(res.message);
        if (res.message === 'okay') {
          this.infoMsg(this.userId);
          this.dialogRef.close();

        }
        else if (res.message === 'Invalid') {
          this.errMsg();
        }

      },
      (err) => {
        console.log(err);
      }

    )


  }


  setValueForm(user) {

    this.form.setValue({
      telephoneNo: user.telephoneNo,
      email: user.email
    });
  }


  infoMsg(id) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Employee ' + id + ' was successfully updated',
      showConfirmButton: false,
      timer: 1500
    })
  }

  errMsg() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Email is already in use!',

    })
  }



}
