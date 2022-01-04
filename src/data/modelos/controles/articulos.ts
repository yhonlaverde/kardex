export class Articulos {
    idItem?: number;
    descripcion?: string;
    sku?: string;
    codigoInternoPMI?: string;
    idClasificacion?: number;
    valorUnitario?: number;
    embalaje?: number;
    peso?: number;
    ean?: string;
    imagen?: string;
    ancho?: number;
    largo?: number;
    alto?: number;
    observacion?: string;
    posicionPrincipal?: string;
    patronEstiba?: number;
    estado?: string;
    idMarca?: number;
    puntaje?: number;
    idUsuarioModificacion?: number;
    fechaModificacion?: string;
    idSubCategoria?: number;
    idProcesoItem?: number;
    idOrigenItem?: number;
    idVariedadItem?: number;
    calificacionCata?: number;
    unidadesEmpaque?: unidadesEmpaque[];
    posiciones?: posiciones[];
    imagenes? : imagenes[];
    precios?:precios[];
}

export class unidadesEmpaque {
    idReferenciaUnidadItem?: number;
    idItem?: number;
    idUnidadEmpaque?: number;
    conversion?: number;
    codigo: string;
    peso: number;
    largo: number;
    ancho: number;
    alto: number;
}

export class posiciones {
    idPosicionItemxAlmacen?: number;
    idItem?: number;
    idAlmacen?: number;
    posicion?: string;
}

export class imagenes {
    idImagenItem: number;
    idItem: number;
    imagen: string;
}

export class precios {
    idPrecioItem: number;
    idListaPrecio: number;
    idItem: number;
    precio: number;
}