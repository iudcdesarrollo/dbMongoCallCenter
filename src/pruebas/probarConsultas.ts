import mongoose from 'mongoose';
import { connectDB } from '../db/connectDB';
import { getAllData } from '../utils/consultas';
import { Consultas } from '../@types/typesMongoDb';

const consulta: Consultas = {
    especifico: true,
    general: true,
    especificoBusqueda: [
        'profesional_psicologia_dobleTitulacion',
        'profesional_psicologia_duracion'
    ],
    generalBusqueda: [
        'xxxxxxxxx_sssssssss'
    ]
};

export const ejecutarPrueba = async (consulta: Consultas) => {
    try {
        await connectDB();
        const resultado = await getAllData(consulta);

        console.log(JSON.stringify(resultado, null, 2));
    } catch (error) {
        console.error('Error:', error);
    }
    finally {
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
        }
    }
};

ejecutarPrueba(consulta);