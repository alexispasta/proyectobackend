import mongoose from "mongoose";

const InformeSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },
    descripcion: {
      type: String,
      trim: true
    },
    empresaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Empresa",
      required: true
    }
  },
  {
    timestamps: true // 🔹 Genera createdAt y updatedAt automáticamente
  }
);

export default mongoose.model("Informe", InformeSchema);
