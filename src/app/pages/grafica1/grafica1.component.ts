import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {
  public labels1: string [] = ['Vehicles', 'Clothing', 'Furniture'];
  public labels2: string [] = ['Car', 'Motorcycles', 'Bikes'];
  public labels3: string [] = ['Entry', 'Departure', 'Stock'];
  public labels4: string [] = ['Chairs', 'Tables', 'Furniture'];
  public data1 = [
    [200, 100, 300],
  ];
  public data2 = [
    [350, 450, 100],
  ];
  public data3 = [
    [799, 400, 100],
  ];
  public data4 = [
    [230, 280, 300],
  ]
 
  constructor() {  }

  ngOnInit(): void {
  }

}
