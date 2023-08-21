import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../_service/user/user.service';

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
      email: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]


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
      gender = this.signup.value.gender
    this.setupForm();

    const payload = {

      firstname,
      lastname,
      dob,
      email,
      username,
      password,
      gender




    };

    this.userService.signup(payload).subscribe(
      (res) => {
        console.log(res);
      },
      (erro) => {
        console.log(erro);
      }

    )
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






}
