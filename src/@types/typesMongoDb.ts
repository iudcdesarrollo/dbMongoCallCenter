export type EspecificoBusquedaFormato = string;
export type EspecificoBusqueda = EspecificoBusquedaFormato | EspecificoBusquedaFormato[];

export interface Consultas {
    especifico: boolean;
    general: boolean;
    especificoBusqueda: string[];
    generalBusqueda: string[];
}