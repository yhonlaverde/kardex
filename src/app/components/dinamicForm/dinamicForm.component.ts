import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import {Campos} from '../../../data/modelos/portalweb/Campos'
import { KeyValueControl } from "./KeyValueControl";

@Component({
  selector: 'app-dinamicForm',
  templateUrl: './dinamicForm.component.html',
  styleUrls: ["./dinamicForm.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DinamicFormComponent),
      multi: true,
    },
  ],
})
export class DinamicFormComponent implements OnInit ,OnChanges{
  
  @Input() fields: Campos[];
  @Input() typeForms: string;
  @Input() class: string;
  @Output() dynamicFormValid = new EventEmitter<boolean>();
  dynamicForm: FormGroup;
  controls: KeyValueControl;

  constructor() {
    
    this.controls = {};
   }

  ngOnInit(): void {
    this.dynamicForm.valueChanges.subscribe((res) => {
      this.dynamicFormValid.emit(!this.dynamicForm.valid);
    });
  }

  ngOnChanges(): void {
      this.fields.map((element) => {
      
        const control = new FormControl({
          value: element.id,
          disabled: this.isDisable(element),
        });
        this.controls[element.id] = control;
        return element;
       });
      this.dynamicForm = new FormGroup(this.controls);
     
  }

  isEnable(field: Campos): void {
    const childField = this.fields.find((fieldPattern) => {
      if (field.id === fieldPattern.idPadre) {
        return fieldPattern;
      }
    });
    if (childField) {
      this.controls[childField.id].reset({ value: "", disabled: !field.valor });
    }
  }
  isDisable(field: Campos): boolean {
    if (field.idPadre > 0) {
      const fieldFather = this.fields.find((element) => {
        if (field.idPadre === element.id) {
          return element;
        }
      });
      return !fieldFather.valor;
    } else if (field?.configs?.disabled) {
      return true;
    }
    return false;
  }
 activeChildrenControl(id: number): void {
    const controlFather = this.dynamicForm.controls[id];
    const fieldChild = this.fields.find((field) => {
      if (field?.idPadre === id) {
        return field;
      }
    });
    if (fieldChild && controlFather?.valid) {
      this.dynamicForm.controls[fieldChild.id].enable();
    }
  }

}
