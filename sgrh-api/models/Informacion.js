// sgrh-api/models/Informacion.js
import mongoose from "mongoose";

const informacionSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  correo: { type: String, required: true },
  telefono: String,
  direccion: String,
  fechaNacimiento: Date,
  ciudad: String
});

export default mongoose.model("Informacion", informacionSchema);
