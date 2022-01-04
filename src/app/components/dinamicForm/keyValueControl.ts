import { FormControl } from '@angular/forms';
/**
 * Interfaz que permite referenciar controles dinámicos
 */
export interface KeyValueControl {
    [key: string]: FormControl;
}
