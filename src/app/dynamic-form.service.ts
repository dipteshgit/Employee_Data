import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormService {
  constructor(private fb: FormBuilder) {}
  createForm(metadata: any): FormGroup {
    const formGroup = this.fb.group({});
    metadata.formFields.forEach((section: any) => {
      section.fields.forEach((field: any) => {
        if (field.name === 'interests') {
          const interestGroup = this.fb.group({
            Reading: ['', this.getValidators(field)],
            Sports: ['', this.getValidators(field)],
            Cooking: ['', this.getValidators(field)],
          });
          formGroup.addControl(field.name, interestGroup);
        } else {
          const control = this.fb.control('', this.getValidators(field));
          formGroup.addControl(field.name, control);
        }
      });
    });
    return formGroup;
  }
  private getValidators(field: any) {
    const validators = [];
    if (field.validations?.isRequired) {
      validators.push(Validators.required);
    }
    if (field.validations?.pattern) {
      validators.push(Validators.pattern(field.validations.pattern));
    }
    return validators;
  }
}
