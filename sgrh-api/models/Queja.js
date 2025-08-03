// sgrh-api/models/Queja.js
import mongoose from "mongoose";

const quejaSchema = new mongoose.Schema({
  asunto: { type: String, required: true },
  mensaje: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
});

export default mongoose.model("Queja", quejaSchema);
