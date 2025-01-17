import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  standalone: false
})
export class StartPage implements OnInit {
  isMobile!: boolean;
  contatos: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.carregarContatos();
    this.checkWindowSize();
  }

  carregarContatos() {
    this.dataService.getContatos().subscribe(
      (data) => {
        console.log('Contatos recebidos:', data);
        this.contatos = data; // Armazena os contatos retornados pela API
      },
      (error) => {
        console.error('Erro ao carregar os contatos:', error);
      }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.isMobile = window.innerWidth < 768;
  }
}
