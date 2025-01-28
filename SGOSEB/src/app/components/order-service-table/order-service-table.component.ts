
import { NgClass, NgFor, NgIf} from '@angular/common';
import { Component, OnInit, Input, NgModule, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from "../button/button.component";


@Component({
  selector: 'app-order-service-table',
  templateUrl: './order-service-table.component.html',
  styleUrls: ['./order-service-table.component.scss'],
  imports: [NgFor, NgIf, IonicModule, FormsModule, ButtonComponent, NgClass]
})
export class OrderServiceTableComponent implements OnInit {
  @Input() tableData: any[] = [];
  @Input() fieldsToShow: string[] = [];
  @Input() fielterCheck:boolean = false;
  @Input() linkFields: string[] = [];
  @Output() linkClick = new EventEmitter<{ row: any, field: string }>();
  @Input() buttonConfig: boolean = false;
  @Output() ActionButton = new EventEmitter();
  @Input() rowSelectionEnabled: boolean = false; // Propriedade para ativar/desativar seleção de linha
  @Output() rowSelected = new EventEmitter<any>(); // Evento para emitir os dados da linha selecionada

  @Input() renamedHeaders: { [key: string]: string } = {}; // Mapeamento para renomear os headers

  selectedRow: any = null;
  currentPage = 1;
  itemsPerPage = 10;
  totalPages: number = 0;
  pageOptions = [10, 15, 20, 30, 40, 50]

    // Propriedades para filtro
  selectedFilterField: string = '';
  filterValue: string = '';
  filteredData: any[] = [];

   // Lista de campos que devem ser exibidos como links

   isLinkField(field: string): boolean {
    return this.linkFields.includes(field);
  }

    // Manipula o clique no botão
  onButtonClick(row: any, event: Event): void {
    if (this.buttonConfig) {
      this.ActionButton.emit({row}); // Emite o evento com os dados do botão
    }
  }



  // Manipula o clique no link
  onLinkClick(row: any, field: string, event: Event): void {
    event.preventDefault(); // Previne o comportamento padrão do link

    this.linkClick.emit({ row, field });
    // Aqui você pode executar qualquer ação, como abrir um modal, redirecionar, etc.
  }

  get tableHeaders(): string[] {
    if (this.tableData.length > 0) {
      return this.fieldsToShow.length > 0 ? this.fieldsToShow : Object.keys(this.tableData[0]);
    }
    return [];
  }

  getRenamedHeader(field: string): string {
    return this.renamedHeaders[field] || field; // Retorna o nome renomeado ou o nome original
  }

  ngOnInit() {
    this.filteredData = [...this.tableData];  // Inicializa filteredData com todos os dados
    this.totalPages = Math.ceil(this.tableData.length / this.itemsPerPage);
  }
  ngOnChanges() {
    this.filteredData = [...this.tableData];  // Atualiza filteredData quando tableData mudar
    this.totalPages = Math.ceil(this.tableData.length / this.itemsPerPage);
  }

    // Atualiza os dados filtrados com base na seleção e no valor de filtro
    applyFilter() {
      if (this.filterValue && this.selectedFilterField) {
        this.filteredData = this.tableData.filter(item =>
          String(item[this.selectedFilterField])
            .toLowerCase()
            .includes(this.filterValue.toLowerCase())
        );
      } else {
        // Se nenhum filtro for aplicado, mostra todos os dados
        this.filteredData = [...this.tableData];
      }
      this.currentPage = 1;
      this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
    }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  updateItemsPerPage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(selectElement.value);
    this.totalPages = Math.ceil(this.tableData.length / this.itemsPerPage);
    this.currentPage = 1;
  }


  onRowSelect(row: any): void {
    if (this.rowSelectionEnabled) {
      this.selectedRow = row; // Define a linha clicada como selecionada
      this.rowSelected.emit(row);
    }
  }
}
