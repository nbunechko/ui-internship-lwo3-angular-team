import { Component, OnInit, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getAllProducts } from 'src/app/store/selectors/products.selectors';

import { Subscription } from 'rxjs';

import { IProductShortInfo } from 'src/app/interfaces';
import { ProductService } from 'src/app/shared/services';
import { ProductFormat } from 'src/app/app.enum';

@AutoUnsubscribe()
@Component({
  selector: 'app-popular-list',
  templateUrl: './popular-list.html',
  styleUrls: ['./popular-list.scss']
})
export class PopularListComponent implements OnInit, OnDestroy {
  public filterItems = ['Trending', 'Bestsellers', 'New', 'On Sale'];
  public getProductsSub: Subscription;
  public productData: Array<IProductShortInfo>;

  constructor(
    private productService: ProductService,
    private store: Store<IAppState>
  ) { }

  public ngOnInit(): void {
    this.productListRefresh('Trending');
  }

  public sortByTag(item: string): void {
    this.productListRefresh(item);
  }

  public ngOnDestroy(): void { }

  private productListRefresh(item?: string): void {
    this.getProductsSub = this.store.select(getAllProducts).subscribe(data => {
      this.productData = data
        .filter(product => item === product.status)
        .map(product =>
          this.productService.formatProduct(product, ProductFormat.short)) as Array<IProductShortInfo>;
    });
  }
}
