import mongoose from "mongoose";

const NominaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cedula: { type: String, required: true },
  cuenta: { type: String, required: true },
  salario: { type: Number, default: 0 },
  auxilio: { type: Number, default: 0 },
  horasExtra: { type: Number, default: 0 },
  bonificacion: { type: Number, default: 0 },
  descuentos: { type: Number, default: 0 },
  empresaId: { type: mongoose.Schema.Types.ObjectId, ref: "Empresa", required: true } // 🔹 para filtrar por empresa
}, { timestamps: true });

export default mongoose.model("Nomina", NominaSchema);
