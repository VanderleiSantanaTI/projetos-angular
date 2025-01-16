import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false
})
export class SearchPage implements OnInit {
  isMobile!: boolean;

  fieldsToShow: string[] = ['marca', 'modelo', 'suCia', 'problema'];
  data = [
    {
      marca: 'Toyota', modelo: 'Corolla', placa: 'ABC-1234', suCia: 'SU-123',
      patrimonio: '123456', hodometro: '12000', problema: 'Problema X', sistemaAfetado: 'Sistema Y',
      data: '2025-01-01', manutencao: 'Manutenção Z', os: 'OS123',
      peca: 'Peça A', ficha: 'Ficha1', servico: 'Serviço B',
      quantidade: 2, retiradoPor: 'Fulano', usuario: 'Beltrano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    },
    {
      marca: 'Honda', modelo: 'Civic', placa: 'XYZ-5678', suCia: 'SU-456',
      patrimonio: '654321', hodometro: '15000', problema: 'Problema Y', sistemaAfetado: 'Sistema Z',
      data: '2025-02-01', manutencao: 'Manutenção X', os: 'OS456',
      peca: 'Peça B', ficha: 'Ficha2', servico: 'Serviço A',
      quantidade: 1, retiradoPor: 'Ciclano', usuario: 'Fulano'
    }
  ];


  constructor() { }

  ngOnInit() {
    this.checkWindowSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }
  checkWindowSize() {
    this.isMobile = window.innerWidth < 768;
  }
}
