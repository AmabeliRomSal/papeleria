import { Component, computed } from "@angular/core";
import { CurrencyPipe } from "@angular/common";
import { CarritoService } from "../../services/carrito.service";
import { Product } from "../../models/product.model";
import { Signal } from "@angular/core";

@Component({
    selector: 'app-carrito',
    standalone: true,
    imports: [CurrencyPipe],
    templateUrl: './carrito.html',
    styleUrls: ['./carrito.css'],
})
export class CarritoComponent{
    carrito: Signal<Product[]>;
    total= computed(() => this.carritoService.total());

    constructor(private carritoService: CarritoService){
        this.carrito= this.carritoService.products;
    }

    quitar(id: string){ this.carritoService.quitar(id);}
    vaciar(){ this.carritoService.vaciar();}
    exportarXml(){ this.carritoService.exportarXML();}
}