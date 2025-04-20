import { Component, Input, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-grafico-manutencao',
  templateUrl: './grafico-manutencao.component.html',
  styleUrls: ['./grafico-manutencao.component.scss']
})
export class GraficoManutencaoComponent implements OnInit {

  @Input() dadosOS: any[] = [];

  // dadosOS: any[] = [
  //   { tipo: 'PREVENTIVA' }, { tipo: 'CORRETIVA' }, { tipo: 'PREVENTIVA' },
  // ];
  constructor() {}

  ngOnInit(): void {

    setTimeout(() => {
    this.loadGoogleCharts();
    },1000);

  }

  loadGoogleCharts() {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/charts/loader.js';
    script.onload = () => {
      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(() => this.drawChart());
    };
    document.body.appendChild(script);
  }

  drawChart() {
    const preventiva = this.dadosOS.filter(os => os.manutencao === 'PREVENTIVA').length;
    const corretiva = this.dadosOS.filter(os => os.manutencao === 'CORRETIVA').length;

    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Tipo');
    data.addColumn('number', 'Quantidade');
    data.addRows([
      ['PREVENTIVA', preventiva],
      ['CORRETIVA', corretiva],
    ]);

    const options = {
      title: 'TOTAL DE MANUTENÇÕES',
      width: 500,
      height: 300,
    };

    const chartDiv = document.getElementById('piechart_div');
    if (chartDiv) {
      const chart = new google.visualization.PieChart(chartDiv);
      chart.draw(data, options);
    }
  }

}
