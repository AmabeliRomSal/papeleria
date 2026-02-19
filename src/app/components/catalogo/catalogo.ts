import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'],
})
export class CatalogoComponent {
  products: Product[]= [];

  constructor(private productsService: ProductsService) { this.products= this.productsService.getAll();}
}
