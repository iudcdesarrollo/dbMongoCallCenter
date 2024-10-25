import { Consultas } from "../@types/typesMongoDb";
import Especifico from '../models/especifico.model';
import General from '../models/general.model';

export const getAllData = async (consulta: Consultas) => {
    try {
        const { especifico, general, especificoBusqueda, generalBusqueda } = consulta;
        const results: Record<string, any> = {};

        if (especifico) {
            if (especificoBusqueda.length === 0) {
                results["especifico"] = "La consulta de datos específicos está vacía.";
            } else {
                const especificoConditions = especificoBusqueda.map(query => {
                    const [tipoPrograma, programa, tema] = query.split('_');
                    return {
                        $and: [
                            { tipoPrograma },
                            { programa },
                            { tema }
                        ]
                    };
                });

                const especificoResult = await Especifico.find(
                    { $or: especificoConditions },
                    {
                        tipoPrograma: 1,
                        programa: 1,
                        tema: 1,
                        informacion: 1,
                        _id: 0
                    }
                ).lean();

                const formattedEspecificoResult = especificoResult.reduce((acc, doc) => {
                    const key = `${doc.tipoPrograma}_${doc.programa}_${doc.tema}`;
                    acc[key] = doc.informacion;
                    return acc;
                }, {} as Record<string, string>);

                results["especifico"] = formattedEspecificoResult;
            }
        }

        if (general) {
            if (generalBusqueda.length === 0) {
                results["general"] = "La consulta de datos generales está vacía.";
            } else {
                const generalConditions = generalBusqueda.map(query => {
                    const parts = query.split('_');
                    const condition: Record<string, any> = {};

                    if (parts.length >= 2) {
                        condition["CategoriaGeneral"] = parts[0];
                        condition["CategoriaEspecifica"] = parts[1];
                    }
                    if (parts.length === 3) {
                        condition["Subcategoria"] = parts[2];
                    }

                    return condition;
                });

                const generalResult = await General.find(
                    { $or: generalConditions.map(cond => ({ $and: Object.entries(cond).map(([key, value]) => ({ [key]: value })) })) },
                    {
                        CategoriaGeneral: 1,
                        CategoriaEspecifica: 1,
                        Subcategoria: 1,
                        informacion: 1,
                        _id: 0
                    }
                ).lean();

                const formattedGeneralResult = generalResult.reduce((acc, doc) => {
                    const key = `${doc.CategoriaGeneral}_${doc.CategoriaEspecifica}${doc.Subcategoria ? `_${doc.Subcategoria}` : ''}`;
                    acc[key] = doc.informacion;
                    return acc;
                }, {} as Record<string, string>);

                results["general"] = formattedGeneralResult;
            }
        }

        return results;

    } catch (error: unknown) {
        console.error('Error en getAllData:', error);
        if (error instanceof Error) {
            throw new Error(`Error al obtener datos: ${error.message}`);
        }
        throw new Error('Error desconocido al obtener datos');
    }
};