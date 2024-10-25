import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const mongoURI = process.env.MONGODB_URI as string;

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            connectTimeoutMS: 20000,
            serverSelectionTimeoutMS: 20000,
        });
        console.log("Conectado a MongoDB Atlas correctamente");
    } catch (error) {
        console.error("Error al conectar a MongoDB Atlas:", error);
        process.exit(1);
    }
};