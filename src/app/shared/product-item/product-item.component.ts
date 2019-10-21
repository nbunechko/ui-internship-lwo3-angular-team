import { Component, Input } from '@angular/core';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from 'src/app/interfaces/product.interface';
import { LocalStorageService } from '../services/local-storage.service';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.scss']
})
export class ProductItemComponent {
  public faHeart = faHeart;
  public product: IProduct;

  @Input() public src = '../../../assets/server-data/images/image-not-found.png';
  @Input() public title = 'Product Title';
  @Input() public price = 0;
  @Input() public productId = 1;

  constructor(private localStorageService: LocalStorageService ){}
  
  
  public OnClick(key: number, value: number){
    this.localStorageService.saveViewedHistory(key, value)
    
  }
}
