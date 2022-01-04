import { Component, EventEmitter, Input, Output } from '@angular/core';
import {IAction} from '../../../data/modelos/controles/IAction'
@Component({
  selector: 'app-actionbutton',
  templateUrl: './actionbutton.component.html',
  styleUrls: ["./actionbutton.component.scss"],
})
export class ActionButtonComponent <T, K>{

  @Input() actions: IAction<T, K>[];
  @Output() actionexecuted = new EventEmitter();

  opened: boolean;
  collapse: string;

  constructor() {
    this.opened = false;
    this.collapse = "<<";
  }

  ChangeOpenWindowsText(drawer: any): void {
    if (this.opened) {
      this.collapse = "<<";
    } else {
      this.collapse = ">>";
    }
    this.opened = !this.opened;
    drawer.toggle();
  }

  LaunchAction(action: IAction<T, K>): void {
    this.actionexecuted.emit(action);
  }
}
