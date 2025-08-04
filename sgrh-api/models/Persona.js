import mongoose from "mongoose";

const personaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // 🔹 Nueva contraseña
  telefono: String,
  direccion: String,
  codigo: String,
  rol: { type: String, enum: ["empleado", "rrhh", "gerente", "supervisor"], required: true },
  fecha: String,
  empresaId: { type: mongoose.Schema.Types.ObjectId, ref: "Empresa", required: true },
  ciudad: String
  
});

export default mongoose.model("Persona", personaSchema);
