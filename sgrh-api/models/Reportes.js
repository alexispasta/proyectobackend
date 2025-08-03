import mongoose from "mongoose";

const ReporteSchema = new mongoose.Schema(
  {
    asunto: { type: String, required: true },
    descripcion: { type: String, required: true },
    empleadoId: { type: mongoose.Schema.Types.ObjectId, ref: "Persona" },
    fechaReporte: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Reporte", ReporteSchema);
