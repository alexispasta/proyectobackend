// sgrh-api/routes/quejas.js
import express from "express";
import Queja from "../models/Queja.js";

const router = express.Router();

// Enviar una queja o sugerencia
router.post("/", async (req, res) => {
  try {
    const nuevaQueja = new Queja(req.body);
    await nuevaQueja.save();
    res.status(201).json({ message: "Queja o sugerencia enviada correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al enviar la queja o sugerencia" });
  }
});

// Obtener todas las quejas (opcional para panel de admin)
router.get("/", async (req, res) => {
  try {
    const quejas = await Queja.find().sort({ fecha: -1 });
    res.json(quejas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener las quejas" });
  }
});

export default router;
