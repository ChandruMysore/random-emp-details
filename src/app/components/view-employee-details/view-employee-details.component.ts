import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ChartComponent,ApexAxisChartSeries,ApexChart,ApexFill,ApexYAxis,ApexTooltip, ApexTitleSubtitle, ApexXAxis } from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'app-view-employee-details',
  templateUrl: './view-employee-details.component.html',
  styleUrls: ['./view-employee-details.component.scss']
})
export class ViewEmployeeDetailsComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public salaryData:any;
  public workingHoursData:any;
  formInstance: FormGroup;

  constructor(public dialogRef: MatDialogRef<ViewEmployeeDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.formInstance = new FormGroup({
        "id":  new FormControl('', Validators.required),
        "name": new FormControl('', Validators.required),
        "jobtitle": new FormControl('', Validators.required),
        "email": new FormControl('', Validators.required),
        "country": new FormControl('', Validators.required),
        "salaryq1": new FormControl('', Validators.required),
        "salaryq2": new FormControl('', Validators.required),
        "salaryq3": new FormControl('', Validators.required),
        "salaryq4": new FormControl('', Validators.required),
        "workinghoursq1": new FormControl('', Validators.required),
        "workinghoursq2": new FormControl('', Validators.required),
        "workinghoursq3": new FormControl('', Validators.required),
        "workinghoursq4": new FormControl('', Validators.required),
        "totlasalary": new FormControl(''),
        "totalhours": new FormControl(''),

      });
  
      this.formInstance.setValue(data);
     }

  ngOnInit(): void {
    this.getChartData();
  }
  getChartData(){
    this.chartOptions = {
      series: [
        {
          name: "Salary",
          type: "column",
          data: [this.data.salaryq1,this.data.salaryq2,this.data.salaryq3,this.data.salaryq4]
        },
        {
          name: "Working Hours",
          type: "line",
          data: [this.data.workinghoursq1,this.data.workinghoursq2,this.data.workinghoursq3,this.data.workinghoursq4]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "Employee Salary & Working Hours"
      },
      dataLabels: {
        enabled: false
      },        
      xaxis: {
        title: {
            text: 'Months'
        },
        categories: ["Jan","Apr","Aug","Dec"],
      },
      yaxis: [
        {
          title: {
            text: "Salary"
          }
        },
        {
          opposite: true,
          title: {
            text: "Working Hours"
          }
        }
      ]
    };
  }
  save(): void {
    this.dialogRef.close(Object.assign(this.formInstance.value));
  }

}
