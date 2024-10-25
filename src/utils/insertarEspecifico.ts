import { Document } from 'mongoose';
import especificoModel from '../models/especifico.model';
import { connectDB } from '../db/connectDB';

const nuevoEspecificoData = {
    tipoPrograma: "profesional",
    programa: "zootecnia",
    tema: "titulo",
    informacion: `El título que obtendrá el estudiante al completar la carrera de Medicina Veterinaria y Zootecnia será: Médico(a) Veterinario(a) y Zootecnista`,
};

const insertarEspecifico = async () => {
    try {
        const nuevoEspecifico: Document = new especificoModel(nuevoEspecificoData);
        await nuevoEspecifico.save();
        console.log("Datos insertados en la colección Especifico correctamente");
    } catch (error) {
        console.error("Error al insertar datos:", error);
    }
};

const main = async () => {
    await connectDB();
    await insertarEspecifico();
};

main();