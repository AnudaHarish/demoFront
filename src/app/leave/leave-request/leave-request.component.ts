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
import Chart, { Chart as ChartJS } from 'chart.js/auto';
import { LeaveInfo } from 'src/app/models/leave-info.model';
import { PendingApplication } from 'src/app/models/pending-application.model';

import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { LeaveItem } from 'src/app/models/leave-item.model';


@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']

})
export class LeaveRequestComponent implements OnInit {



  constructor(private fb: FormBuilder, private fb2: FormBuilder, private userAuthService: UserAuthService, private employeeService: EmpolyeeService) {


  }

  setForm() {
    this.formRepeat = this.fb2.group({
      item: this.fb2.array([])

    });
  }

  ngOnInit(): void {

    this.setForm();



    this.infoLeave()
    // this.getDate();
    this.form = this.fb.group({
      daterange: new FormGroup({
        startDate: new FormControl(),
        endDate: new FormControl()
      })
    });


    this.disablePendingDate();


    // this.dateConversion(this.dateList);

    // console.log(this.dateList);
    // console.log(this.holidays);

  }


  leaveItem: LeaveItem = {
    date: [],
    type: '',
    duration: ''
  }
  checkFormDate;
  checkDuration;
  checkType;

  checkLeaveList: [];

  checkCount: any;
  duration: any;
  type: any;
  msg: any;
  minDate: any;
  form: FormGroup;
  date1: any;
  date2: any;
  formRepeat: FormGroup;
  isVisible = false;
  dateArray: any = [];
  leaveArray: any = [];
  inboundClick = true;
  graph;
  leaveItemList: any = [];
  starDate: any;
  endDate: any;
  minimum: any;

  pendingApplication: PendingApplication = {
    item: [],
    userId: 0
  }

  holidays: Date[] = [];




  info: LeaveInfo = {
    sick: 0,
    casual: 0,
    annual: 0
  }

  dateList: any = [];






  maxDate = "2023-04-20";



  // onStartChange(event: any) {
  //   console.log('change ', event.value);


  // }

  // dateForm = new FormGroup({
  //   dateControl: this.dateFormControl
  // });


  clearDate(event) {
    event.stopPropagation();
    this.endDate = null;
  }


  getDate(data: any) {
    let date: any = data;
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
    // console.log(dates);
    this.dateArray = dates;
    // console.log(this.dateArray[0]);

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
    // console.log(value.daterange);

    // this.date1 = value.daterange.startDate;
    // this.date2 = value.daterange.endDate;

    // console.log(this.date1);
    // console.log(this.date2);


    // this.enumerateDaysBetweenDates(this.date1, this.date2);
    // this.addCreds();

    // this.infoLeave();


  }


  addCreds() {
    const formArray = this.formRepeat.controls.item as FormArray;
    this.dateArray.forEach((item) => {
      formArray.push(this.fb2.group({
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
    // for (let leave of this.formRepeat.value.item) {
    //   console.log(leave);
    // }



    console.log(this.formRepeat.value.item);




    this.pendingApplication.item = this.formRepeat.value.item,
      this.pendingApplication.userId = this.userAuthService.getId();
    this.checkLeaveItems(this.pendingApplication);
    // this.employeeService.addRequest(this.pendingApplication).subscribe(
    //   (resp) => {
    //     console.log(resp);

    //     this.reset();
    //     this.infoLeave();

    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );




  }

  public infoLeave() {
    let id = this.userAuthService.getId();

    this.employeeService.leaveInfo(id).subscribe(

      (res) => {
        this.info.annual = res.annual;
        this.info.casual = res.casual;
        this.info.sick = res.sick;
        this.chart(this.info);

        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );

  }


  reset() {



    this.isVisible = false;
    this.starDate = '';
    this.endDate = '';
    this.formRepeat.reset();
    this.setForm();
    this.form.reset();
    this.disablePendingDate();
    this.dateList = [];
    this.dateArray = [];
    this.infoLeave()

  }


  public chart(info: LeaveInfo) {


    if (this.graph) {
      this.graph.clear();
      this.graph.destroy();
    }

    this.graph = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Casual', 'Sick', 'Annual'],
        datasets: [{
          label: '# No of Leaves',
          data: [this.info.casual, this.info.sick, this.info.annual],

          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }

        }
      }
    });




  }


  disablePendingDate(): void {
    let id = this.userAuthService.getId();
    this.employeeService.getPendingLeaveDate(id).subscribe(
      (res: any) => {
        // this.filterdate(res);
        this.dateConversion(res);

        this.dateList = res;




      },
      (err) => {
        console.log(err);
      }
    )






  }



  filterdate(list: any) {


    this.dateList = list;

  }


  dateFilter = (d: Date): boolean => {
    // console.log(d);
    if (!d) {
      return false;
    }
    const time = d.getTime();
    // console.log(this.dateList);
    return !this.holidays.find(x => x.getTime() == time);



  }

  dateConversion(_dateList) {

    for (let date of _dateList) {
      // console.log(typeof date);
      const newdate = new Date(date);

      this.holidays.push(newdate);


    }

    this.dateFilter = (d: Date): boolean => {
      // console.log(d);
      if (!d) {
        return false;
      }
      const time = d.getTime();
      // console.log(this.dateList);
      return !this.holidays.find(x => x.getTime() == time);



    }


    console.log(this.holidays)


  }




  weekendsDatesFilter: (date: Date | null) => boolean =
    (date: Date | null) => {
      const day = date.getDay();
      return day !== 0 && day !== 6;
      //0 means sunday
      //6 means saturday
    }


  selectStartDateChangedHandler(event: any) {
    this.starDate = event.target.value;
    this.minimum = new Date(this.starDate);
    // console.log(this.starDate);



  }

  selectEndDateChangedHandler(event: any) {
    this.endDate = event.target.value;
    console.log(this.starDate);
    this.enumerateDaysBetweenDates(this.starDate, this.endDate);
    console.log(this.dateArray);
    this.checkDate(this.dateArray);
    console.log(this.checkFormDate);

    // this.getDate(this.getMin)





  }



  checkDate(arrList) {
    this.employeeService.checkAppyDate(this.userAuthService.getId(), arrList).subscribe(
      (res: any): any => {

        // for (let mess of res) {
        //   console.log(mess);
        // }
        this.msg = res.message;
        const value1: string = "Invalid";
        console.log(value1);

        const value2: string = "Already applied";
        const value3: string = "okay"
        console.log(this.msg);
        if (this.msg === value1) {
          console.log("error");
          this.erroMsg("Invalid", "Can't apply on Weekends");
          this.resetPage();
        }
        if (this.msg === value2) {
          this.erroMsg("Invalid", "Already applied on the given dates")
        }
        if (this.msg === value3) {
          this.addCreds();

          this.onSubmit()
        }

        console.log(res);


      },
      (err): any => {
        console.log(err);
      }
    )

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



  selectChangedDuration(event: any) {
    this.duration = event.target.value;
    console.log(this.duration);




  }

  selectChangedType(event: any) {
    this.type = event.target.value;
    console.log(this.type);





  }



  checkLeaveItems(pendingApplicatio: PendingApplication) {

    this.employeeService.ckeckLeavesItem(pendingApplicatio).subscribe(
      (res: any): any => {
        let sick: string = 'Sick';
        let casual: string = 'Casual';
        let annual: string = 'Annual'
        this.checkCount = res.body.message;
        if (this.checkCount === 'Sick') {

          this.erroMsg("Invalid", "Can't process due to insufficient sick leaves");
        }
        else if (this.checkCount === 'Casual') {

          this.erroMsg("Invalid", "Can't process due to insufficient casual leaves");
        }
        else if (this.checkCount === 'Annual') {

          this.erroMsg("Invalid", "Can't process due to insufficient annaul leaves");
        }
        else {
          this.employeeService.addRequest(this.pendingApplication).subscribe(
            (resp) => {
              console.log(resp);

              this.reset();
              this.infoLeave();
              this.successMsg();

            },
            (err) => {
              console.log(err);
            }
          );
        }
        console.log(res.body.message);

        // this.employeeService.addRequest(this.pendingApplication).subscribe(
        //   (resp) => {
        //     console.log(resp);

        //     this.reset();
        //     this.infoLeave();

        //   },
        //   (err) => {
        //     console.log(err);
        //   }
        // );

      },
      (err) => {
        console.log(err);
      }
    )
  }



  // erroMsg(title, text) {
  //   Swal.fire({
  //     icon: 'error',
  //     title: title,
  //     text: text
  //   })
  // }

  erroMsg(title, text) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,

    })
  }


  resetPage() {
    this.employeeService.refreshPage.subscribe(() => {
      this.selectStartDateChangedHandler(event);
      this.selectEndDateChangedHandler(event);
      this.reset();


    });

  }

  successMsg() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your leave application was successfully sent',
      showConfirmButton: false,
      timer: 1500
    })
  }




}
