
export class Campos {
  descripcion: string;
  esObligatorio: boolean;
  id: number;
  description: string;
  metadata: string;
  tipoColumna: string;
  orden: number;
  requerido: boolean;
  ubicacion: string;
  idPadre: number;
  valor?: Filtros[];
  options: Filtros[];
  metaDato?: string;
  value?: string;
  isSearching?: boolean;
  configs: {
    disabled: boolean;
  };
}

export class Fields {
  filtros: Campos[];
}

export interface Filtros {
  id: number;
  valor: string;
}

export class FiltrosRequest {
  campo: string;
  persona: string;
  padre: string;
  busqueda: string;
}
