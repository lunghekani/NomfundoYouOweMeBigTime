import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Stocks } from 'src/models/stocks.model';
import { StockServiceService } from './stock-service.service';
import { Sort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import stockVals from '../../assets/Stock Values.json';
import { StockValues } from 'src/models/stockvalues.model';

@Component({
  selector: 'app-stock-tables',
  templateUrl: './stock-tables.component.html',
  styleUrls: ['./stock-tables.component.css'],
})
export class StockTablesComponent implements OnInit {
  searchQuery = '';
  stock: Stocks[] = [];
  stockValues: StockValues[] = stockVals;
  selectedStockValues: StockValues[]=[]
  sortedData: Stocks[] = [];
  selectedStocks: Stocks[] = [];
  searchResults: Stocks[] = [];

  constructor(
    private stockService: StockServiceService
  ) {}

  ngOnInit(): void {
    this.loadStocks();
  }

  fillSecondTable(id: Number) {
    console.log(
this.selectedStockValues=      this.stockValues.filter(x=> x.stock_id===id));
  }

  search(event: any) {
    this.searchQuery = event.target.value;
    if (this.searchQuery !== null) {
      this.searchResults = this.stock.filter(
        (x) => x && x.stock.includes(event.target.value)
      );
      this.stock = this.searchResults;
    } else {
    }
    // this.loadStocks();
  }

  sortData(sort: Sort) {
    const data = this.stock.slice();

    if (!sort.active || sort.direction === '') {
      this.sortedData = this.stock;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'byId':
          return this.compare(a.id.toString(), b.id.toString(), isAsc);
        case 'byName':
          return this.compare(a.stock, b.stock, isAsc);
        case 'byIndustry':
          return this.compare(a.industry, b.industry, isAsc);
        case 'bySector':
          return this.compare(a.sector, b.sector, isAsc);
        case 'byCode':
          return this.compare(a.currency_code, b.currency_code, isAsc);
        default:
          return 0;
      }
    });
    this.stock = this.sortedData;
  }

  compare(a: number | String, b: number | String, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  selectHandler(row: Stocks) {
    this.fillSecondTable(row.id);
  }

  loadStocks() {
    this.stockService.getAllStocks().subscribe((stocks) => {
      this.stock = stocks; // local genres array = subcribed genre
    });
  }
}
