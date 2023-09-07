import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../_service/user/user.service';
import { ChangePasswordRequest } from '../models/change-password-request.model';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ConfirmedValidator } from 'src/confirmed.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  ngOnInit(): void {
    this.setupForm();

  }
  constructor(private fb: FormBuilder, private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ChangePasswordComponent>) {
    this.request = new ChangePasswordRequest();

  }


  changePassword: FormGroup;
  request: ChangePasswordRequest;
  getNewPass: any;
  getConfPass: any;


  setupForm() {
    this.changePassword = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: ConfirmedValidator('newPassword', 'confirmPassword')
    });
  }

  get oldPassword() {
    return this.changePassword.get('oldPassword');
  }
  get newPassword() {
    return this.changePassword.get('newPassword');
  }
  get confirmPassword() {
    return this.changePassword.get('confirmPassword');
  }


  save() {

    console.log(this.changePassword.value);
    this.request.oldPassword = this.changePassword.value.oldPassword;
    this.request.newPassword = this.changePassword.value.newPassword;
    this.request.id = this.data;

    if (this.changePassword.value.confirmPassword === this.changePassword.value.newPassword) {
      this.request.id
      this.userService.changePassword(this.request).subscribe(
        (res: any): any => {

          console.log(res.message);
          if (res.message === "Bad Request") {
            this.errorMes("Invalid", "Bad Request")
          } else if (res.message === "successful") {
            this.dialogRef.close();
            this.succMesg("Successfully updated the password");

          }

        },
        (err) => {
          console.log(err);
        }
      );

    } else {
      this.errorMes("Invalid", "Password doesn't match")
    }





  }

  checkPassword(): boolean {
    if (this.getNewPass === this.getConfPass) {
      console.log(this.getNewPass === this.getConfPass)
      return true;

    }
    else
      return false;
  }


  getNewPassword(event: any) {
    this.getNewPass = event.target.value;
    // console.log(this.getNewPass);
  }

  getConfirmPassword(event: any) {
    this.getConfPass = event.target.value;
    // console.log(this.confirmPassword);
  }


  errorMes(title, text) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text

    })
  }

  succMesg(title) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }


}
