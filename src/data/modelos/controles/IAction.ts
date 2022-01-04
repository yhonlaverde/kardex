import { ActionsToExecute } from "../utils/ActionsToExecute";

/**
 * Esta interfaz permitirá guardar acciones de los botones de forma genérica,
 * t es el tipo de dato del parámetro y k es el retorno
 */
export interface IAction<t, k> {
  currentaction?: ActionsToExecute;
  description?: string;
  icon?: string;
  disabled?: boolean;
  /**Guarda */
  savedata?(parameter: t): k;
  /** actualiza */
  updatedata?(data: t, key: any): k;
  /** Obtiene dato */
  getdata?(parameter: t): k;
  /** Nuevo */
  newdata?(): k;
  /** elimina el dato */
  deletedata?(key: any): k;
}
