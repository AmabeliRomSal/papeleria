import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'],
})
export class CatalogoComponent{
  private productsService= inject(ProductsService);
  products= toSignal(this.productsService.getAll(), {initialValue: []});

  //constructor(private productsService: ProductsService){}
}

/*export class CatalogoComponent {
  products: Product[]= [];

  constructor(private productsService: ProductsService) { this.products= this.productsService.getAll();}
}*/
