import mongoose from 'mongoose';
import { connectDB } from '../db/connectDB';
import { getAllData } from '../utils/consultas';
import { ConsultaEspecifica } from '../@types/typesMongoDb';

const consulta: ConsultaEspecifica = {
    especifico: true,
    especificoBusqueda: [
        'profesional_psicologia_dobleTitulacion',
        'profesional_psicologia_duracion'
    ]
};

export const ejecutarPrueba = async (consulta: ConsultaEspecifica) => {
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