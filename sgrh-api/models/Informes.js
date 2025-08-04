import mongoose from "mongoose";

const InformeSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String },
    fecha: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Informe", InformeSchema);
