import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = ["Sales Download", "Sales 2 Do", "Sales 3 Do"];
  public labels2: string[] = ["Otra cosa Download", "otra cosa 2 Do", "otra cosa 3 Do"];
  public labels3: string[] = ["Blabla Download", "Bla bla 2 Do", "bla bla 3 Do"];


  public data1: number[] = [50, 60, 70];


}
