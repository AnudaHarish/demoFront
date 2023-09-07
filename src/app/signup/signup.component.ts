import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_service/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signup: any;
  ngOnInit(): void {

    this.setupForm();

  }


  constructor(private fb: FormBuilder, private datePipe: DatePipe, private userService: UserService) {

  }

  setupForm() {

    this.signup = this.fb.group({

      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      telephoneNo: ['', [Validators.required, Validators.pattern("[0-9]{10}")]]


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
      password = this.signup.value.password,
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
    return this.signup.get('password');
  }

  get password() {
    return this.signup.get('confirmPassword');
  }
  get telephoneNo() {
    return this.signup.get('telephoneNo');
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

  checkPassword(payload, confirmPassword): boolean {
    let pas = Number(payload.password);
    let con = Number(confirmPassword);
    console.log(this.password);
    console.log(this.confirmPassword);
    console.log("pas", pas);
    console.log("con", con);

    if (pas === con) {
      this.userService.signup(payload).subscribe(
        (res) => {
          console.log(res);
          this.infoMsg();

        },
        (erro) => {
          console.log(erro);
          console.log(erro.error.email,
            erro.error.telephoneNo,
            erro.error.message, erro.error.password);
          let messInvalidTel = '';
          let messInvalidEmail = '';
          let messInvalidUser = '';
          let messInvalidPass = '';
          if (erro.error.telephoneNo !== undefined)
            messInvalidTel = erro.error.telephoneNo;
          if (erro.error.email !== undefined)
            messInvalidEmail = erro.error.email;
          if (erro.error.message !== undefined)
            messInvalidUser = erro.error.message;
          if (erro.error.password !== undefined)
            messInvalidPass = erro.error.password;
          let mess = messInvalidEmail + "\n" + messInvalidTel + "\n" + messInvalidUser + "\n" + messInvalidPass;

          let splitted = mess.split(mess);
          this.errMsg("Invalid:", mess

          )

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











