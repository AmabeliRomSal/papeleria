import { Injectable, signal } from "@angular/core";
import { Product } from "../../models/product.model";

@Injectable({providedIn: 'root'})
export class CarritoService{
    //Lista del carrito
    private productosSignal= signal<Product[]>([]);

    //modo solo lectura
    productos = this.productosSignal.asReadonly();

    //OPCIONES CRUD
    agregar(producto: Product){ this.productosSignal.update(lista => [...lista, producto]);}

    quitar(idProducto: string){ this.productosSignal.update(lista => lista.filter(p => p.idProducto !== idProducto));}

    vaciar(){ this.productosSignal.set([]);}

    total(): number{ return this.productosSignal().reduce((acc, p) => acc + p.precio, 0);}

    //devolver archivo XML
    exportarXML(){
        const productos= this.productosSignal();

        //estructura escrita manualmente
        let xml= '<?xml version="1.0" encoding="UTF-8"?>\n<recibo>\n';

        for(const p of productos){
            xml += '<producto>\n';
            xml += '\t<id>${p.idProducto}</id>\n';
            
        }
    }
}