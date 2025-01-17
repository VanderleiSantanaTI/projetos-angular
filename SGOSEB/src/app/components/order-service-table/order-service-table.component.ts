
import { NgFor} from '@angular/common';
import { Component, OnInit, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-order-service-table',
  templateUrl: './order-service-table.component.html',
  styleUrls: ['./order-service-table.component.scss'],
  imports: [NgFor, IonicModule,FormsModule]
})
export class OrderServiceTableComponent implements OnInit {
  @Input() tableData: any[] = [];
  @Input() fieldsToShow: string[] = [];

  currentPage = 1;
  itemsPerPage = 10;
  totalPages: number = 0;
  pageOptions = [10, 15, 20, 30, 40, 50]

    // Propriedades para filtro
  selectedFilterField: string = '';
  filterValue: string = '';
  filteredData: any[] = [];
  
  get tableHeaders(): string[] {
    if (this.tableData.length > 0) {
      return this.fieldsToShow.length > 0 ? this.fieldsToShow : Object.keys(this.tableData[0]);
    }
    return [];
  }

  ngOnInit() {
    this.filteredData = [...this.tableData];  // Inicializa filteredData com todos os dados
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
}
