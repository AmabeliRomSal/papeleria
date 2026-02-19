import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";

@Injectable ({providedIn: 'root'})
export class ProductsService{
    private readonly products: Product[]= [
        {
            id:1,
            name: 'Audifonos chidos',
            price: 100,
            imageUrl: 'https://picsum.photos/seed/headphones/400/300',
            category: 'Audio',
            description: 'Audífonos chidoris.',
            inStock: true,
        },
    ];

    getAll(): Product[]{ return this.products;}
}