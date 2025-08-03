import mongoose from "mongoose";

const PermisosEmpleadoSchema = new mongoose.Schema(
  {
    empleadoId: { type: mongoose.Schema.Types.ObjectId, ref: "Persona" }, // opcional
    empleadoNombre: { type: String, required: true },
    motivo: { type: String, required: true },
    descripcion: { type: String, required: true },
    fechaSolicitud: { type: Date, default: Date.now },
    estado: { type: String, enum: ["pendiente", "aprobado", "rechazado"], default: "pendiente" },
  },
  { timestamps: true }
);

export default mongoose.model("PermisosEmpleado", PermisosEmpleadoSchema);
