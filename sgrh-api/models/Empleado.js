import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  documento: { type: String, required: true, unique: true },
  correo: String,
  fecha: Date,
  estado: { type: String, default: "activo" },
  salario: Number,
  cargo: String,
  eps: String,
});

export default mongoose.model("Empleado", empleadoSchema);
