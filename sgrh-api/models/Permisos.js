import mongoose from "mongoose";

const PermisosSchema = new mongoose.Schema(
  {
    empleadoId: { type: mongoose.Schema.Types.ObjectId, ref: "Persona", required: true },
    empleadoNombre: { type: String }, // opcional, para mostrar rápido
    motivo: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
    estado: { type: String, enum: ["pendiente", "aprobado", "rechazado"], default: "pendiente" },
  },
  { timestamps: true }
);

export default mongoose.model("Permisos", PermisosSchema);
