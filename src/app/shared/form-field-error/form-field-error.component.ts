import { Component, Input, OnInit } from '@angular/core';

export class FormFieldErrorMessage {
  required:string;
}

@Component({
  selector: 'app-form-field-error',
  templateUrl: './form-field-error.component.html',
  styleUrls: ['./form-field-error.component.scss']
})
export class FormFieldErrorComponent {

  @Input() error: any;
  @Input() message: FormFieldErrorMessage;
  constructor() { }

}
