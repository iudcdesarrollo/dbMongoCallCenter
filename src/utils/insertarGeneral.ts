import { Document } from 'mongoose';
import generalModel from '../models/general.model';
import { connectDB } from '../db/connectDB';

const nuevoGeneralData = {
    CategoriaGeneral: "xxxxxxxxx",
    CategoriaEspecifica: "sssssssss",
    Subcategoria: "ssssssssss"
};

const insertarGeneral = async () => {
    try {
        const nuevoGeneral: Document = new generalModel(nuevoGeneralData);
        await nuevoGeneral.save();
        console.log("Datos insertados en la colección General correctamente");
    } catch (error) {
        console.error("Error al insertar datos en General:", error);
    }
};

const main = async () => {
    await connectDB();
    await insertarGeneral();
};

main();