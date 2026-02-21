import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Product } from "../models/product.model";
import { HttpClient } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { isPlatformBrowser } from "@angular/common";

@Injectable({providedIn: 'root'})
export class ProductsService{
    private http= inject(HttpClient);
    private platformId= inject(PLATFORM_ID);
    //constructor(private http: HttpClient){}

    getAll(): Observable<Product[]> {
        if(!isPlatformBrowser(this.platformId)) return of([]);
        return this.http.get('productos.xml',
            {responseType: 'text'})
            .pipe(map((xmlText) => this.parseProductsXml(xmlText))
        );
    }

    private parseProductsXml(xmlText: string): Product[]{
        const parser= new DOMParser();
        const doc= parser.parseFromString(xmlText, 'application/xml');
        if(doc.getElementsByTagName('parsererror').length > 0) return[];
        
       return Array.from(doc.getElementsByTagName('product'))
        .map((node) => ({
        idProducto: this.getText(node, 'id'),
        nombre: this.getText(node, 'nombre'),
        precio: this.getNumber(node, 'precio'),
        descripcion: this.getText(node, 'descripcion'),
        estado: this.getText(node, 'estado'),
        cantidad: this.getNumber(node, 'cantidad'),
        imagen: this.getText(node, 'imagen') || null,
        fecha: this.getText(node, 'fecha'),
        }));
    }

    private getText(parent: Element, tag: string): string{
        return parent.getElementsByTagName(tag)[0]?.textContent?.trim() ?? '';
    }

    private getNumber(parent: Element, tag: string): number{
        const n= Number(this.getText(parent, tag));
        return Number.isFinite(n) ? n : 0;
    }

    private getBoolean(parent: Element, tag: string): boolean{
        const v= this.getText(parent, tag).toLowerCase();
        return v === 'true' || v === '1' || v === 'yes';
    }
}

/*@Injectable ({providedIn: 'root'})
export class ProductsService{
    private readonly products: Product[]= [
        {
            id:1,
            name: 'Audifonos chidos',
            price: 100,
            imageUrl: 'https://picsum.photos/seed/headphones/400/300',
            //imageUrl: 'C:/Users/amabe/prograWeb22/src/app/assets/nokia1100.jpg',
            category: 'Audio',
            description: 'Audífonos chidoris para escuchar música.',
            inStock: true,
        },
    ];

    getAll(): Product[]{ return this.products;}
}*/