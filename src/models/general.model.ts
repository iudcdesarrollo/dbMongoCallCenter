import mongoose, { Schema, Document } from 'mongoose';

interface IGeneral extends Document {
    CategoriaGeneral: string;
    CategoriaEspecifica: string;
    Subcategoria: string;
    informacion: string;
}

const GeneralSchema: Schema = new Schema({
    CategoriaGeneral: { type: String, required: true },
    CategoriaEspecifica: { type: String, required: true },
    Subcategoria: { type: String },
    informacion: { type: String, required: true }
});

export default mongoose.model<IGeneral>('General', GeneralSchema);