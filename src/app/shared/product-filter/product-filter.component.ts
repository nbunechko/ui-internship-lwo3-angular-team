import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IProduct } from 'src/app/interfaces';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.html',
  styleUrls: ['./product-filter.scss']
})

export class ProductFilterComponent implements OnInit {
  @Input() public products: Array<IProduct>;
  @Output() dataChange = new EventEmitter();

  public productCategory: Array<string> = [];
  public productBrand: Array<string> = [];
  public filterRequest = [];
  public selectedProducts = [];
  public checkedCriteria: string;
  public criteriaName: string;
  public criteriaIndex: number;

  public onCreateRequest(event) {
    this.criteriaName = event.target.value;

    this.filterRequest = event.target.checked ?
      [...this.filterRequest, this.criteriaName] :
      this.filterRequest.filter(item => this.criteriaName !== item);
  }

  public ngOnInit(): void {
    this.products.forEach(item => {
      this.productCategory.push(item.category);
      this.productBrand.push(item.brand);
    });
    this.productCategory = [...new Set(this.productCategory)];
    this.productBrand = [...new Set(this.productBrand)];
  }

  private onFilter() {
    if (this.filterRequest.length) {
    this.filterRequest.forEach((criteria) =>
      this.products.every(product => {
        for (const prop in product) {
          if (product[prop] === criteria) {
            this.selectedProducts.push(product);
            this.selectedProducts = [...new Set(this.selectedProducts)];
            this.dataChange.emit(this.selectedProducts);
          }
        }
      }
      )
    );
    } else {
      this.selectedProducts = this.products;
      this.dataChange.emit(this.selectedProducts);
    }
  }
}
