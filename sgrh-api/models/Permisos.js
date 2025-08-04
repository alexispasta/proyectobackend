import mongoose from "mongoose";

const PermisosSchema = new mongoose.Schema(
  {
    empleadoId: { type: mongoose.Schema.Types.ObjectId, ref: "Persona", required: true },
    empleadoNombre: { type: String }, // Para mostrar rápido en la tabla
    motivo: { type: String, required: true },
    estado: { type: String, enum: ["pendiente", "aprobado", "rechazado"], default: "pendiente" },
    empresaId: { type: mongoose.Schema.Types.ObjectId, ref: "Empresa", required: true },
  },
  { timestamps: true } // Genera createdAt y updatedAt automáticamente
);

export default mongoose.model("Permisos", PermisosSchema);
