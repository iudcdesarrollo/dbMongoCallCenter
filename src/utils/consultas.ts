import { ConsultaEspecifica } from "../@types/typesMongoDb";
import Especifico from '../models/especifico.model';

export const getAllData = async (consulta: ConsultaEspecifica) => {
    try {
        const { especifico, especificoBusqueda } = consulta;

        if (especifico && especificoBusqueda.length === 0) {
            return `La consulta de cosas especificas esta basia.`;
        }

        const queryArray = especificoBusqueda;

        const conditions = queryArray.map(query => {
            const [tipoPrograma, programa, tema] = query.split('_');
            return {
                $and: [
                    { tipoPrograma },
                    { programa },
                    { tema }
                ]
            };
        });

        const result = await Especifico.find(
            { $or: conditions },
            { 
                tipoPrograma: 1,
                programa: 1,
                tema: 1,
                informacion: 1,
                _id: 0
            }
        ).lean();

        const formattedResult = result.reduce((acc, doc) => {
            const key = `${doc.tipoPrograma}_${doc.programa}_${doc.tema}`;
            acc[key] = doc.informacion;
            return acc;
        }, {} as Record<string, string>);

        return formattedResult;

    } catch (error: unknown) {
        console.error('Error en getAllData:', error);
        if (error instanceof Error) {
            throw new Error(`Error al obtener datos: ${error.message}`);
        }
        throw new Error('Error desconocido al obtener datos');
    }
};