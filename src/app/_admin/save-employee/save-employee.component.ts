import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/_service/_admin/admin.service';
import { UserService } from 'src/app/_service/user/user.service';
import { ConfirmedValidator } from 'src/confirmed.validator';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-save-employee',
  templateUrl: './save-employee.component.html',
  styleUrls: ['./save-employee.component.css']
})


export class SaveEmployeeComponent implements OnInit {


  ngOnInit(): void {

    this.setupForm();
  }

  constructor(private fb: FormBuilder, private adminService: AdminService, private userService: UserService, private datePipe: DatePipe, private dialogRef: MatDialogRef<SaveEmployeeComponent>) {

  }

  signup: FormGroup;



  setupForm() {
    this.signup = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      username: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      telephoneNo: ['', [Validators.required, Validators.pattern("[0-9]{10}")]]
    },

      {
        validator: ConfirmedValidator('newPassword', 'confirmPassword')
      });
  }

  save() {

    console.log(this.signup.value);

    const formattedDate = this.datePipe.transform(this.signup.value.dob, 'yyyy-MM-dd');
    let firstname = this.signup.value.firstname,
      lastname = this.signup.value.lastname,
      dob = formattedDate,
      email = this.signup.value.email,
      username = this.signup.value.username,
      password = this.signup.value.newPassword,
      gender = this.signup.value.gender,
      telephoneNo = this.signup.value.telephoneNo,
      confirmPassword = this.signup.value.confirmPassword

    this.setupForm();

    const payload = {

      firstname,
      lastname,
      dob,
      email,
      username,
      password,
      gender,
      telephoneNo,





    };
    this.checkPassword(payload, confirmPassword);



    console.log(payload);


  }

  get firstname() {
    return this.signup.get('firstname');
  }


  get lastname() {
    return this.signup.get('lastname');
  }

  get gender() {
    return this.signup.get('gender');
  }

  get dob() {
    return this.signup.get('dob');
  }
  get email() {
    return this.signup.get('email');
  }
  get username() {
    return this.signup.get('username');
  }

  get confirmPassword() {
    return this.signup.get('confirmPassword');
  }

  get newPassword() {
    return this.signup.get('newPassword');
  }
  get telephoneNo() {
    return this.signup.get('telephoneNo');
  }


  setFormValue(formValue) {
    this.signup.setValue({

      firstname: formValue.firstname,
      lastname: formValue.lastname,
      dob: formValue.dob,
      email: formValue.email,
      username: formValue.username,
      newPassword: formValue.newPassword,
      gender: formValue.gender,
      telephoneNo: formValue.telephoneNo,
      confirmPassword: ''
    })




  }



  checkPassword(payload, confirmPassword): boolean {
    let pas = Number(payload.password);
    let con = Number(confirmPassword);
    console.log(this.newPassword);
    console.log(this.confirmPassword);
    console.log("pas", pas);
    console.log("con", con);

    if (pas === con) {
      this.userService.signup(payload).subscribe(
        (res) => {
          console.log(res);
          this.dialogRef.close();
          this.infoMsg();


        },
        (erro) => {
          console.log(erro);
          console.log(erro.error.email,
            erro.error.telephoneNo,
            erro.error.message, erro.error.newPassword);
          let messInvalidTel = '';
          let messInvalidEmail = '';
          let messInvalidUser = '';
          let messInvalidPass = '';
          if (erro.error.telephoneNo !== undefined) {
            this.setFormValue(payload);
            messInvalidTel = erro.error.telephoneNo;
            this.errMsg("Invalid:", messInvalidTel)
          }


          if (erro.error.email !== undefined) {
            this.setFormValue(payload);
            messInvalidEmail = erro.error.email;
            this.errMsg("Invalid:", messInvalidEmail)
          }

          if (erro.error.message !== undefined) {
            this.setFormValue(payload);
            messInvalidUser = erro.error.message;
            this.errMsg("Invalid:", messInvalidUser);
          }

          if (erro.error.password !== undefined) {
            this.setFormValue(payload);
            messInvalidPass = erro.error.password;
            let mess = messInvalidEmail + "\n" + messInvalidTel + "\n" + messInvalidUser + "\n" + messInvalidPass;

            let splitted = mess.split(mess);
            this.errMsg("Invalid:", mess)
          }



        }

      )
      return true;
    }

    else
      this.errMsg("Invalid", "Password doesn't match")
    return false;





  }


  errMsg(title, text) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,

    })
  }


  infoMsg() {

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Successfully registered',
      showConfirmButton: false,
      timer: 1500
    })

  }



}
