import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {displayedColumns} from "../../../data/modelos/controles/displayeColumns"

@Injectable({ providedIn: "root" })
export class DataInventory {
    constructor() { }
    fields: any[];

    newInvetory() {
        this.fields = [
            {
                valor: "",
                metaDato: "TT",
                id: 1,
                descripcion: "Núm. Documento",
                esObligatorio: false,
                configs: {
                    disabled: true,
                },
            },
            {
                valor: "",
                metaDato: "TT",
                id: 2,
                descripcion: "Doc. Referencia",
                esObligatorio: true,
                configs: {
                    disabled: true,
                },
            },
            {
                valor: "",
                metaDato: "LT",
                id: 3,
                descripcion: "Proveedor",
                esObligatorio: false,
                options: [
                    {
                        valor: 'NINGUNO'
                    },
                    {
                        valor: 'ALMASE LTDA'
                    }
                    ,
                    {
                        valor: 'ARTURO CALLE'
                    }
                    ,
                    {
                        valor: 'AVIANCA S.A'
                    }
                ]
            },
            {
                valor: "",
                metaDato: "LT",
                id: 4,
                descripcion: "Cliente",
                esObligatorio: false,
                options: [
                    {
                        valor: 'NINGUNO'
                    },
                    {
                        valor: 'ALDEMAR ARCILA'
                    }
                    ,
                    {
                        valor: 'ANDRES JAIMEZUREK'
                    }
                    ,
                    {
                        valor: 'ARMANDO PELAES'
                    }
                ]
            },
            {
                valor: "",
                metaDato: "TT",
                id: 5,
                descripcion: "Actividad",
                esObligatorio: true,
                configs: {
                    disabled: true,
                },
            },
            {
                valor: "",
                metaDato: "LT",
                id: 6,
                descripcion: "Cliente",
                esObligatorio: false,
                options: [
                    {
                        valor: 'NINGUNO'
                    },
                    {
                        valor: 'DEVOLUCIÓN ALMACEN'
                    }
                    ,
                    {
                        valor: 'DEVOLUCIÓN PROVEEDOR'
                    }
                ]
            },
            {
                valor: "1",
                metaDato: "CBX",
                id: 7,
                descripcion: "Estado",
                esObligatorio: false,
                configs: {
                    disabled: true,
                },
            },
            {
                valor: "",
                metaDato: "TA",
                id: 8,
                descripcion: "Observación",
                esObligatorio: true,
            },

            

        ];

        return this.fields;
    }


    
}

export const displayedColumnsDetalleArticulo: displayedColumns[] = [
    { name: "IdItem", show: false, style: 'text' },
    { name: "SKU", show: true, style: 'text' },
    { name: "Cod. Int. PMI", show: false, style: 'text' },
    { name: "Descripcion", show: false, style: 'textc' },
    { name: "Clasificacion", show: false, style: 'text' },
    { name: "Costo Unitario", show: false, style: 'number' },
    { name: "Embalaje", show: true, style: 'number' },
    { name: "Peso", show: true, style: 'number' },
    { name: "EAN", show: true, style: 'number' },
    { name: "Imagen", show: true, style: 'number' },
    { name: "Ancho", show: true, style: 'text' },
    { name: "Largo", show: true, style: 'number' },
    { name: "Alto", show: true, style: 'number' },
    { name: "Volumen", show: true, style: 'number' },
    { name: "PosiciónPrincipal", show: false, style: 'text' },
    { name: "PatrónEstiba", show: false, style: 'number' },
    { name: "Estado", show: true, style: 'number' },
    { name: "Marca", show: true, style: 'number' },
    { name: "UsuarioModificación", show: false, style: 'text' },
    { name: "FechaModificación", show: false, style: 'text' },

]; 