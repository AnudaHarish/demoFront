import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_service/user/user.service';
import Swal from 'sweetalert2';
import { ConfirmedValidator } from 'src/confirmed.validator';
import { RouteReuseStrategy, Router } from '@angular/router';
import { outputAst } from '@angular/compiler';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  IsModelShow = true;
  signup: any;
  ngOnInit(): void {

    this.setupForm();

  }

  @ViewChild('modal')
  modal: SignupComponent;

  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter();

  constructor(private fb: FormBuilder, private datePipe: DatePipe, private userService: UserService, private router: Router) {

  }

  setupForm() {

    this.signup = this.fb.group({

      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      telephoneNo: ['', [Validators.required, Validators.pattern("[0-9]{10}")]]


    },
      { validator: ConfirmedValidator('password', 'confirmPassword') });
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
    return this.signup.get('confirmPassword');
  }

  get password() {
    return this.signup.get('password');
  }
  get telephoneNo() {
    return this.signup.get('telephoneNo');
  }


  setSignupValues(formValues) {
    this.signup.setValue({
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      gender: formValues.gender,
      dob: formValues.dob,
      email: formValues.email,
      username: formValues.username,
      telephoneNo: formValues.telephoneNo,
      password: '',
      confirmPassword: ''
    });
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
          this.router.navigate(["/login"]);
          this.closeModel();


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
          if (erro.error.telephoneNo !== undefined) {
            this.setSignupValues(payload);
            messInvalidTel = erro.error.telephoneNo;
          }

          if (erro.error.email !== undefined) {
            this.setSignupValues(payload);
            messInvalidEmail = erro.error.email;
          }

          if (erro.error.message !== undefined) {
            this.setSignupValues(payload);
            messInvalidUser = erro.error.message;

          }

          if (erro.error.password !== undefined) {
            this.setSignupValues(payload);
            messInvalidPass = erro.error.password;

          }

          let mess = messInvalidEmail + "\n" + messInvalidTel + "\n" + messInvalidUser + "\n" + messInvalidPass;

          let splitted = mess.split(mess);
          this.errMsg("Invalid:", mess)
          this.setSignupValues(payload);

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


  closeModel() {
    // this.IsModelShow = true;
    this.onClose.emit(true);
  }



}











