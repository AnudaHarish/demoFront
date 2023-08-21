import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateRange, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { toHtml } from '@fortawesome/fontawesome-svg-core';
import { UserAuthService } from 'src/app/_service/user-auth.service';
import { EmpolyeeService } from 'src/app/_service/empolyee.service';



@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']

})
export class LeaveRequestComponent implements OnInit {
  minDate: any;
  form: FormGroup;
  date1: any;
  date2: any;
  formRepeat: FormGroup;
  isVisible = false;
  dateArray: any = [];
  leaveArray: any = [];
  inboundClick = true;


  ngOnInit(): void {

    this.getDate();
    this.form = this.fb.group({
      daterange: new FormGroup({
        startDate: new FormControl(),
        endDate: new FormControl()
      })
    });



  }

  constructor(private fb: FormBuilder, private fb2: FormBuilder, private userAuthService: UserAuthService, private employeeService: EmpolyeeService) {

    this.formRepeat = this.fb2.group({
      item: this.fb2.array([])

    });
  }




  maxDate = "2023-04-20";



  // onStartChange(event: any) {
  //   console.log('change ', event.value);


  // }

  // dateForm = new FormGroup({
  //   dateControl: this.dateFormControl
  // });


  getDate() {
    let date: any = new Date();
    console.log(date);
    let todate: any = date.getDate();
    console.log(todate);
    if (todate < 10) {
      todate = '0' + todate;
    }

    let month: any = date.getMonth() + 1;
    console.log(month);
    if (month < 10) {
      month = '0' + month;
    }

    let year: any = date.getFullYear();
    console.log(year);

    this.minDate = year + '-' + month + '-' + todate;
    console.log(this.minDate);

  }


  enumerateDaysBetweenDates(startDate, endDate) {
    let dates = [];
    while (startDate <= endDate) {
      let initDate = new Date(startDate);
      let todate: any = initDate.getDate();
      console.log(todate);
      if (todate < 10) {
        todate = '0' + todate;
      }
      let month: any = initDate.getMonth() + 1;
      console.log(month);
      if (month < 10) {
        month = '0' + month;
      }


      let year: any = initDate.getFullYear();
      console.log(year);

      dates.push(year + '-' + month + '-' + todate);

      // dates.push(initDate.getDay() + '-' + (initDate.getMonth() + 1) + '-' + initDate.getFullYear());
      startDate.setTime(startDate.getTime() + 24 * 60 * 60 * 1000); // adding one day

      console.log(initDate);


    }
    console.log(dates);
    this.dateArray = dates;
    console.log(this.dateArray[0]);

    return dates;


  }

  visible(value) {
    if ((value !== null) && this.formRepeat.value !== null) {
      this.isVisible = true;
    }
  }

  onSubmit() {



    //console.log(this.form.value);
    const value = this.form.value;

    this.visible(value);
    console.log(value.daterange);

    this.date1 = value.daterange.startDate;
    this.date2 = value.daterange.endDate;

    console.log(this.date1);
    console.log(this.date2);


    this.enumerateDaysBetweenDates(this.date1, this.date2);
    this.addCreds();


  }


  addCreds() {
    const formArray = this.formRepeat.controls.item as FormArray;
    this.dateArray.forEach((item) => {
      formArray.push(this.fb2.group({
        username: this.userAuthService.getusername(),
        date: item,
        type: '',
        duration: '',

      }));
      console.log(item);
    })

  }


  submitRepeat() {

    // console.log(' all rows : ', this.formRepeat.value.item);
    // console.log(' all rows : ', this.formRepeat.value[1]);
    for (let leave of this.formRepeat.value.item) {
      console.log(leave);
    }



    this.employeeService.addRequest(this.formRepeat.value.item).subscribe(
      (resp) => {
        console.log(resp);

      },
      (err) => {
        console.log(err);
      }
    );

    this.reset();
  }


  reset() {

    this.dateArray = [];
    this.isVisible = false;
    this.date1 = '';
    this.date2 = '';
    this.formRepeat.reset();
    this.form.reset()
  }








}
