import mongoose, { Schema, Document } from 'mongoose';

interface IEspecifico extends Document {
    tipoPrograma: string;
    programa: string;
    tema: string;
    informacion: string;
}

const EspecificoSchema: Schema = new Schema({
    tipoPrograma: { type: String, required: true },
    programa: { type: String, required: true },
    tema: { type: String, required: true },
    informacion: { type: String, required: true },
});

export default mongoose.model<IEspecifico>('Especifico', EspecificoSchema);