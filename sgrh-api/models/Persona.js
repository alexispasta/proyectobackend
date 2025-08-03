import mongoose from "mongoose";

const personaSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  email: String,
  telefono: String,
  direccion: String,
  codigo: String,
  rol: String,
  fecha: String,
  ciudad: String
});

export default mongoose.model("Persona", personaSchema);
