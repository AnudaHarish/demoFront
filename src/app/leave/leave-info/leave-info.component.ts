import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpolyeeService } from 'src/app/_service/empolyee.service';
import { LeaveItem } from 'src/app/models/leave-item.model';
import { UpdateRequest } from 'src/app/models/update-request.model';
import { EditComponent } from 'src/app/user/edit/edit.component';
import { __values } from 'tslib';

@Component({
  selector: 'app-leave-info',
  templateUrl: './leave-info.component.html',
  styleUrls: ['./leave-info.component.css']
})
export class LeaveInfoComponent implements OnInit {

  ngOnInit(): void {
    this.setForm()
    this.setValue();

  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private employeeService: EmpolyeeService, public dialogRef: MatDialogRef<EditComponent>) { }

  monthF;
  dayF;
  form: FormGroup;
  itemList: LeaveItem = this.data.item;
  leave: LeaveItem = {
    date: [],
    duration: '',
    type: '',
  }
  index = this.data.index;
  update: UpdateRequest = {
    id: 0,
    index: 0,
    updateDetails: this.leave
  }



  setForm() {
    this.form = this.fb.group({
      date: [{ value: this.itemList.date, disabled: true }],
      type: ['', [Validators.required]],
      duration: ['', [Validators.required]]
    })


  }

  setValue() {

    console.log(this.itemList.date)

    this.form.setValue({

      date: this.createDate(this.itemList.date),
      type: this.itemList.type,
      duration: this.itemList.duration
    })
  }

  save() {
    console.log(this.form.value);
    this.leave.date = this.itemList.date,
      this.leave.duration = this.form.value.duration;
    this.leave.type = this.form.value.type

    this.update.id = this.data.leaveId;
    this.update.index = this.data.index;
    this.update.updateDetails = this.leave


    this.employeeService.updateApplication(this.update).subscribe(
      (res: any): any => {

        if (res.body.message) {
          this.dialogRef.close();
        }

      },
      (err) => {
        console.log(err);
      }
    )



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





}
