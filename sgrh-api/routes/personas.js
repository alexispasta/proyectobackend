import express from "express";
import Persona from "../models/Persona.js";

const router = express.Router();

// POST /api/personas
router.post("/", async (req, res) => {
  try {
    console.log("📩 Datos persona recibidos:", req.body);
    const nuevaPersona = new Persona(req.body);
    await nuevaPersona.save();
    res.status(201).json({ message: "Persona registrada correctamente" });
  } catch (error) {
    console.error("❌ Error al registrar persona:", error);
    res.status(500).json({ error: "Error al registrar persona" });
  }
});

export default router;
