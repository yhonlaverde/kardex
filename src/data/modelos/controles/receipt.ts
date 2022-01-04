export class Receipt {
  idDocumentoBodega?: number;
  idTipoDocumento?: number;
  numeroDocumento?: number;
  estado?: string;
  documentoReferencia?: string;
  idCliente?: number;
  idProveedor?: number;
  idMotivo?: number;
  actividad?: string;
  observacion?: string;
  idUsuarioCreacion?: number;
  idUsuarioModificacion?: number;
  fechaCreacion?: string;
  fechaModificacion?: string;
  detalle?: detalleDocumento[];

}

export class detalleDocumento {
    idReferenciaDocumentoCompra?: number;
    idDocumentoBodega?: number;
    idItem?: number;
    cantidad?: number;
    valorUnitario?: number;
    fechaVencimiento?: string;
    posicion?: string;
    idAlmacenOrigen?: number;
    idAlmacenDestino?: number;
    idReferenciaDocumentoBodegaDestino?: number
}