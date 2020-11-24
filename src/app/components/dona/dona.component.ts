import { Component, OnInit, Input } from '@angular/core';
//Librerias de la grafica
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
  @Input() title: string = 'Sin título';

  @Input('labels') doughnutChartLabels: Label[] = ['label1', 'label2', 'label3'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];

  public doughnutChartType: ChartType = 'doughnut';

  public colors: Color[] = [
    { backgroundColor: [ '#1A8FE6', '#F2B40F', '#1FFC0F' ]}
  ];

}
