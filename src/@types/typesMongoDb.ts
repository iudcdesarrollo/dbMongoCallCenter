export type EspecificoBusquedaFormato = string;
export type EspecificoBusqueda = EspecificoBusquedaFormato | EspecificoBusquedaFormato[];

export interface ConsultaEspecifica {
    especifico: boolean;
    especificoBusqueda: string[];
}