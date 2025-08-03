import mongoose from "mongoose";

const asistenciaSchema = new mongoose.Schema({
  documento: { type: String, required: true },
  fecha: { type: Date, required: true },
  estado: { type: String, enum: ["Presente", "Ausente", "Permiso", "Retardo"], required: true },
});

export default mongoose.model("Asistencia", asistenciaSchema);
