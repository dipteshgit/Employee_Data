
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormService } from '../dynamic-form.service';

@Component({
  selector: 'app-dynamicform',
  templateUrl: './dynamicform.component.html',
  styleUrls: ['./dynamicform.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() metadata: any;
  form!: FormGroup;
  submitted:boolean=false;
  nameFormGroup:any;
  constructor(private dynamicFormService: DynamicFormService) {}

  ngOnInit(): void {

    this.form = this.dynamicFormService.createForm(this.metadata);
    this.nameFormGroup = this.form.get('interests') as FormGroup;
   
  }

  submit(){
    this.submitted=true;
    if(this.form.valid){
      console.log(this.form.value)
    }
  }

}
