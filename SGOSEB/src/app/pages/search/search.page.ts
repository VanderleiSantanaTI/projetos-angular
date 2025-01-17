import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false
})
export class SearchPage implements OnInit {
  isMobile!: boolean;

  fieldsToShow: string[] = ['marca', 'modelo', 'suCia'];
  data = [
    {
      marca: 'Toyota', modelo: 'Corolla', placa: 'ABC-1234', suCia: 'SU-123',
      patrimonio: '123456', hodometro: '12000', problema: 'Problema X', sistemaAfetado: 'Sistema Y',
      data: '2025-01-01', manutencao: 'Manutenção Z', os: 'OS123',
      peca: 'Peça A', ficha: 'Ficha1', servico: 'Serviço B',
      quantidade: 2, retiradoPor: 'Fulano', usuario: 'Beltrano'
    },
    {
      "marca": "Honda", "modelo": "Civic", "placa": "DEF-5678", "suCia": "SU-456",
      "patrimonio": "654321", "hodometro": "25000", "problema": "Problema Y", "sistemaAfetado": "Sistema X",
      "data": "2025-02-10", "manutencao": "Manutenção A", "os": "OS456",
      "peca": "Peça B", "ficha": "Ficha2", "servico": "Serviço C",
      "quantidade": 1, "retiradoPor": "Ciclano", "usuario": "Beltrano"
  },
  {
      "marca": "Ford", "modelo": "Focus", "placa": "GHI-9012", "suCia": "SU-789",
      "patrimonio": "987654", "hodometro": "18000", "problema": "Problema Z", "sistemaAfetado": "Sistema W",
      "data": "2025-03-15", "manutencao": "Manutenção B", "os": "OS789",
      "peca": "Peça C", "ficha": "Ficha3", "servico": "Serviço D",
      "quantidade": 3, "retiradoPor": "Deltrano", "usuario": "Fulano"
  },
  {
      "marca": "Chevrolet", "modelo": "Onix", "placa": "JKL-3456", "suCia": "SU-321",
      "patrimonio": "456789", "hodometro": "15000", "problema": "Problema A", "sistemaAfetado": "Sistema Z",
      "data": "2025-04-20", "manutencao": "Manutenção C", "os": "OS321",
      "peca": "Peça D", "ficha": "Ficha4", "servico": "Serviço E",
      "quantidade": 1, "retiradoPor": "Sicrano", "usuario": "Ciclano"
  },
  {
      "marca": "Volkswagen", "modelo": "Golf", "placa": "MNO-7890", "suCia": "SU-654",
      "patrimonio": "789123", "hodometro": "30000", "problema": "Problema B", "sistemaAfetado": "Sistema V",
      "data": "2025-05-25", "manutencao": "Manutenção D", "os": "OS654",
      "peca": "Peça E", "ficha": "Ficha5", "servico": "Serviço F",
      "quantidade": 2, "retiradoPor": "Zé", "usuario": "João"
  },
  {
    "marca": "Toyota", "modelo": "Hilux", "placa": "PQR-1122", "suCia": "SU-987",
    "patrimonio": "321654", "hodometro": "35000", "problema": "Problema C", "sistemaAfetado": "Sistema U",
    "data": "2025-06-10", "manutencao": "Manutenção E", "os": "OS987",
    "peca": "Peça F", "ficha": "Ficha6", "servico": "Serviço G",
    "quantidade": 1, "retiradoPor": "Carlos", "usuario": "Pedro"
},
{
    "marca": "Honda", "modelo": "Fit", "placa": "STU-3344", "suCia": "SU-222",
    "patrimonio": "998877", "hodometro": "22000", "problema": "Problema D", "sistemaAfetado": "Sistema T",
    "data": "2025-07-15", "manutencao": "Manutenção F", "os": "OS222",
    "peca": "Peça G", "ficha": "Ficha7", "servico": "Serviço H",
    "quantidade": 2, "retiradoPor": "João", "usuario": "Paulo"
},
{
    "marca": "Ford", "modelo": "Ka", "placa": "VWX-5566", "suCia": "SU-333",
    "patrimonio": "112233", "hodometro": "17000", "problema": "Problema E", "sistemaAfetado": "Sistema S",
    "data": "2025-08-20", "manutencao": "Manutenção G", "os": "OS333",
    "peca": "Peça H", "ficha": "Ficha8", "servico": "Serviço I",
    "quantidade": 1, "retiradoPor": "Bruno", "usuario": "Gustavo"
},
{
    "marca": "Chevrolet", "modelo": "S10", "placa": "YZA-7788", "suCia": "SU-444",
    "patrimonio": "445566", "hodometro": "29000", "problema": "Problema F", "sistemaAfetado": "Sistema R",
    "data": "2025-09-25", "manutencao": "Manutenção H", "os": "OS444",
    "peca": "Peça I", "ficha": "Ficha9", "servico": "Serviço J",
    "quantidade": 3, "retiradoPor": "Fernando", "usuario": "Ricardo"
},
{
    "marca": "Volkswagen", "modelo": "Polo", "placa": "BCD-9900", "suCia": "SU-555",
    "patrimonio": "667788", "hodometro": "13000", "problema": "Problema G", "sistemaAfetado": "Sistema Q",
    "data": "2025-10-05", "manutencao": "Manutenção I", "os": "OS555",
    "peca": "Peça J", "ficha": "Ficha10", "servico": "Serviço K",
    "quantidade": 2, "retiradoPor": "André", "usuario": "Rafael"
},
{
    "marca": "Fiat", "modelo": "Argo", "placa": "EFG-1122", "suCia": "SU-666",
    "patrimonio": "889900", "hodometro": "27000", "problema": "Problema H", "sistemaAfetado": "Sistema P",
    "data": "2025-11-15", "manutencao": "Manutenção J", "os": "OS666",
    "peca": "Peça K", "ficha": "Ficha11", "servico": "Serviço L",
    "quantidade": 1, "retiradoPor": "Vinícius", "usuario": "Diego"
},
{
    "marca": "Renault", "modelo": "Duster", "placa": "HIJ-3344", "suCia": "SU-777",
    "patrimonio": "223344", "hodometro": "31000", "problema": "Problema I", "sistemaAfetado": "Sistema O",
    "data": "2025-12-01", "manutencao": "Manutenção K", "os": "OS777",
    "peca": "Peça L", "ficha": "Ficha12", "servico": "Serviço M",
    "quantidade": 3, "retiradoPor": "Lucas", "usuario": "Marcelo"
},
{
    "marca": "Hyundai", "modelo": "HB20", "placa": "KLM-5566", "suCia": "SU-888",
    "patrimonio": "556677", "hodometro": "14000", "problema": "Problema J", "sistemaAfetado": "Sistema N",
    "data": "2025-12-10", "manutencao": "Manutenção L", "os": "OS888",
    "peca": "Peça M", "ficha": "Ficha13", "servico": "Serviço N",
    "quantidade": 2, "retiradoPor": "Felipe", "usuario": "Eduardo"
},
{
    "marca": "Peugeot", "modelo": "208", "placa": "NOP-7788", "suCia": "SU-999",
    "patrimonio": "778899", "hodometro": "23000", "problema": "Problema K", "sistemaAfetado": "Sistema M",
    "data": "2025-12-20", "manutencao": "Manutenção M", "os": "OS999",
    "peca": "Peça N", "ficha": "Ficha14", "servico": "Serviço O",
    "quantidade": 1, "retiradoPor": "Guilherme", "usuario": "Alex"
},
{
    "marca": "Nissan", "modelo": "Kicks", "placa": "QRS-9900", "suCia": "SU-111",
    "patrimonio": "112233", "hodometro": "20000", "problema": "Problema L", "sistemaAfetado": "Sistema L",
    "data": "2025-12-30", "manutencao": "Manutenção N", "os": "OS111",
    "peca": "Peça O", "ficha": "Ficha15", "servico": "Serviço P",
    "quantidade": 2, "retiradoPor": "Thiago", "usuario": "Bruno"
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
