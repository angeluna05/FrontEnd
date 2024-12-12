import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NgbTimeStruct, NgbTimeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent implements OnInit  {
  
  time = {hour: 12, minute: 12};
  meridian = true;

  timeSeccond: NgbTimeStruct = {hour: 12, minute: 12, second: 0};
  seconds = true;

  timeSpinners = {hour: null, minute: null};
  spinners = true;

  timeCustom: NgbTimeStruct = {hour: null, minute: null, second: null};
  hourStep = null;
  minuteStep = null;
  secondStep = null;

  constructor() { }

  ngOnInit() { }

  toggleMeridian() {
      this.meridian = !this.meridian;
  }

  toggleSeconds() {
    this.seconds = !this.seconds;
  }

  toggleSpinners() {
      this.spinners = !this.spinners;
  }

  ctrl = new UntypedFormControl('', (control: UntypedFormControl) => {
    const value = control.value;
    if (!value) {
      return null;
    }
    if (value.hour < 12) {
      return {tooEarly: true};
    }
    if (value.hour > 13) {
      return {tooLate: true};
    }
    return null;
  });

}
