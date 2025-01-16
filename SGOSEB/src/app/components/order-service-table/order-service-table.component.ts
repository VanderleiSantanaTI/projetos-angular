
import { NgFor} from '@angular/common';
import { Component, OnInit, Input, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-order-service-table',
  templateUrl: './order-service-table.component.html',
  styleUrls: ['./order-service-table.component.scss'],
  imports: [NgFor, IonicModule]
})
export class OrderServiceTableComponent implements OnInit {
  @Input() tableData: any[] = [];
  @Input() fieldsToShow: string[] = [];

  currentPage = 1;
  itemsPerPage = 10;
  totalPages: number = 0;
  pageOptions = [10, 15, 20, 30, 40, 50]
  
  get tableHeaders(): string[] {
    if (this.tableData.length > 0) {
      return this.fieldsToShow.length > 0 ? this.fieldsToShow : Object.keys(this.tableData[0]);
    }
    return [];
  }

  ngOnInit() {
    this.totalPages = Math.ceil(this.tableData.length / this.itemsPerPage);
  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.tableData.slice(startIndex, startIndex + this.itemsPerPage);
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
