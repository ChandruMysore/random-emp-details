import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-form-dialog',
  templateUrl: './employee-form-dialog.component.html',
  styleUrls: ['./employee-form-dialog.component.scss']
})
export class EmployeeFormDialogComponent implements OnInit {
  formInstance: FormGroup;

  constructor(public dialogRef: MatDialogRef<EmployeeFormDialogComponent>,
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

  ngOnInit(): void {}
  save(): void {
    this.dialogRef.close(Object.assign(this.formInstance.value));
  }

}
