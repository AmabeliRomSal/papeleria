import { Injectable, signal } from "@angular/core";
import { Product } from "../models/product.model";
import { Block } from "@angular/compiler";

@Injectable({providedIn: 'root'})
export class CarritoService{
    //Lista del carrito
    private productsSignal= signal<Product[]>([]);

    //modo solo lectura
    products = this.productsSignal.asReadonly();

    //OPCIONES CRUD
    agregar(producto: Product){ this.productsSignal.update(lista => [...lista, producto]);}

    quitar(idProducto: string){ this.productsSignal.update(lista => lista.filter(p => p.idProducto !== idProducto));}

    vaciar(){ this.productsSignal.set([]);}

    total(): number{ return this.productsSignal().reduce((acc, p) => acc + p.precio, 0);}

    //devolver archivo XML
    exportarXML(){
        const products= this.productsSignal();

        /*
        <id>P005</id>
        <nombre>Carpeta</nombre>
        <precio>45.00</precio>
        <descripcion>Carpeta de 2 anillas</descripcion>
        <estado>Disponible</estado>
        <cantidad>75</cantidad>
        <imagen>carpeta.jpg</imagen>
        <fecha>2025-04-29</fecha>
        */

        /*
        export interface Product {
            idProducto: string;      
            nombre: string;          
            precio: number;          
            descripcion: string;     
            estado: string;          
            cantidad: number;        
            imagen: string | null;   
            fecha: string;     
        }      
        */

        //estructura escrita manualmente
        let xml= '<?xml version="1.0" encoding="UTF-8"?>\n<recibo>\n';

        for(const p of products){
            xml += '<producto>\n';
            xml += '\t<id>${p.idProducto}</id>\n';
            xml += '\t<nombre>${p.nombre}</nombre>\n';
            xml += '\t<precio>${p.precio}</precio>\n';
            if(p.descripcion){
                xml += '\t<descripcion>${this.escapeXml(p.descripcion)}</descripcion>\n';
            }
            xml += '</producto>\n';
        }
        xml += '\t<total>${this.total()}</total>\n';
        xml += '</recibo>';

        const blob= new Blob([xml], {type: 'application/xml'});
        const url= URL.createObjectURL(blob);

        const a= document.createElement('a');
        a.href= url;
        a.download= 'recibo.xml';
        a.click();

        URL.revokeObjectURL(url);
    }

    private escapeXml(value: string): string{
        return value
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll('""', '&apos;');
    }
}