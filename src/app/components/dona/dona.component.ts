import { Component, Input, OnInit } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {
  @Input() title: string = 'Sin Titulo';
  // @Input() labels1;
  // @Input() data1; 

   // Doughnut
   @Input('labels') doughnutChartLabels: Label[] = ['labels1', 'label2', 'labels3'];
   @Input('data') doughnutChartData: MultiDataSet = [[0, 0, 0],];
 
   public colors: Color[]=[
     {backgroundColor: ['#6857E6', '#009FEE','#F02059' ]}
   ]
 
  constructor() { }

  ngOnInit(): void {
  }

}
