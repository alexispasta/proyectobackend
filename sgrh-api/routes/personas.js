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
router.get("/", async (req, res) => {
  try {
    const personas = await Persona.find();
    res.json(personas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener personas" });
  }
});
// personas.js
router.put("/:id", async (req, res) => {
  try {
    const persona = await Persona.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!persona) return res.status(404).json({ error: "Empleado no encontrado" });
    res.json(persona);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar empleado" });
  }
});



export default router;
