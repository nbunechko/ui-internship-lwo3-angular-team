import { Component, Input, OnInit } from '@angular/core';

import { IProduct } from 'src/app/interfaces/product.interface';
import { IProductDetails } from 'src/app/interfaces/product-details.interface';
import { faHeart, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IProductOptions } from 'src/app/interfaces/product-options.interface';
import { IProductDescription } from 'src/app/interfaces/product-description.interface';
import { IProductImage } from 'src/app/interfaces/product-image.interface';

const DELIVERY_MOCK = 'Officia sint Lorem do officia velit voluptate. Dolor commodo pariatur irure do excepteur ullamco commodo pariatur et. Esse velit incididunt qui incididunt consectetur ea sit excepteur ex eu. Nisi esse dolore aute laborum.'
const STYLE_MOCK = 'Ullamco eu ut consequat eu sit nostrud occaecat ad nulla nisi cupidatat.';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.html',
  styleUrls: ['./product-order.scss']
})
export class ProductOrderComponent implements OnInit {
  @Input() product: IProduct;

  public productDetails: IProductDetails;
  public productImages: Array<IProductImage>;
  public selectedSize: string;
  public selectedColor: number;
  public selectedQty: number;
  public iconWhishlistBtn: IconDefinition = faHeart;

  public ngOnInit(): void {
    const productOptions: IProductOptions = {
      colors: this.product.colors,
      sizes: this.product.sizes,
      quantity: this.product.quantity
    };
    const productDescription: IProductDescription = {
      detail: this.product.description,
      style: STYLE_MOCK,
      delivery: DELIVERY_MOCK,
    };

    this.selectedColor = productOptions.colors[0];
    this.selectedQty = 1;
    this.productDetails = {
      title: this.product.productName,
      price: this.product.price,
      brand: this.product.brand,
      category: this.product.category,
      sex: this.product.sex,
      season: this.product.season,
      options: productOptions,
      description: productDescription,
    }
    this.productImages = this.product.images;
  }

  public handleSizeSelect(event: string): void {
    this.selectedSize = event;
  }

  public handleColorSelect(event: number): void {
    this.selectedColor = event;
  }

  public handleQuantitySelect(event: number): void {
    this.selectedQty = event;
  }

  public onBuyClick(): void {
    // TODO: imlement after CartComponent is implemented
    const message = `Added ${this.productDetails.title} to your cart.
      Quantity: ${this.selectedQty}.
      Size: ${this.selectedSize}.
      Color: ${this.selectedColor}.
      Full price: ${this.selectedQty * this.productDetails.price} uah.`

    alert(message);
  }

  public addToWhishlistClick(): void {
    // TODO: imlement after WhishlistComponent is implemented
    alert(`${this.productDetails.title} added  to whishlist`);
  }
}