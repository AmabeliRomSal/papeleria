import { Component, inject, computed, signal } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarritoComponent } from '../carrito/carrito';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [ProductCardComponent, CarritoComponent],
  templateUrl: './catalogo.html',
  styleUrls: ['./catalogo.css'],
})
export class CatalogoComponent{
  //private productsService= inject(ProductsService);
  //products= toSignal(this.productsService.getAll(), {initialValue: []});

  //constructor(private productsService: ProductsService){}
  
  products= signal<Product[]>([]);
  inStockCount= computed(() => this.products().filter(p => p.estado).length);

  constructor(
    private productsService: ProductsService,
    private carritoService: CarritoService
  ){
    this.productsService.getAll().subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Error cargando archivo XML: ', err),
    });
  }

  agregar(producto: Product){
    this.carritoService.agregar(producto);
  }
}

/*export class CatalogoComponent {
  products: Product[]= [];

  constructor(private productsService: ProductsService) { this.products= this.productsService.getAll();}
}*/
