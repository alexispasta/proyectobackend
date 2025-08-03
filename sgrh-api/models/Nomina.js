// sgrh-api/models/Nomina.js
import mongoose from "mongoose";

const NominaSchema = new mongoose.Schema({
  nombre: String,
  cedula: Number,
  cuenta: String,
  salario: Number,
  auxilio: Number,
  horasExtra: Number,
  bonificacion: Number,
  descuentos: Number
});

export default mongoose.model("Nomina", NominaSchema);
