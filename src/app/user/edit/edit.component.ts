import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmpolyeeService } from 'src/app/_service/empolyee.service';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  [x: string]: any;


  msg;
  form: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditComponent>, private fb: FormBuilder, private employeeService: EmpolyeeService, private router: Router) {

  }

  user: User = {
    firstname: '',
    lastname: '',
    email: '',
    telephoneNo: ''

  }
  userId = this.data;

  ngOnInit(): void {
    this.setForm();
    this.getUserInfo();


  }







  onClick(): void {
    this.dialogRef.close();
  }

  setForm() {
    this.form = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephoneNo: ['', [Validators.required, Validators.pattern("[0-9]{10}")]]


    });

  }
  save() {


    this.employeeService.updateUser(this.userId, this.form.value).subscribe(
      (res: any): any => {

        this.msg = res.message;
        if (this.msg === "okay") {
          this.dialogRef.close();

        }
        else if (this.msg === "Invalid") {

          this.showSuccessMessage("Invalid", "Email is alredy in user, Enter another email")

        }


        console.log(res.message);

      },
      (erro) => {
        console.log(erro);
      }
    );



  }


  getUserInfo() {
    this.employeeService.getInfoById(this.userId).subscribe(
      (res) => {
        this.user = res;
        console.log(this.user);
        this.form.setValue({
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          email: this.user.email,
          telephoneNo: this.user.telephoneNo
        })

      }
    )
  }




  get email() {
    return this.form.get('email');
  }

  get firstname() {
    return this.form.get('firstname');
  }

  get telephoneNo() {
    return this.form.get('telephoneNo');
  }


  showSuccessMessage(
    title, message, icon = null,
    showCancelButton = true) {
    return Swal.fire({
      title: title,
      text: message,
      icon: icon,
      showCancelButton: showCancelButton
    })


  }
}

