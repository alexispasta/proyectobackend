import express from "express";
import Informe from "../models/Informes.js";

const router = express.Router();

// ✅ Obtener informes por empresa (primero)
router.get("/empresa/:empresaId", async (req, res) => {
  try {
    const { empresaId } = req.params;
    const informes = await Informe.find({ empresaId }).sort({ createdAt: -1 });
    res.json(informes);
  } catch (error) {
    console.error("❌ Error al obtener informes por empresa:", error.message);
    res.status(500).json({ error: "Error al obtener informes de la empresa" });
  }
});

// Obtener todos los informes (solo si es necesario para admin)
router.get("/", async (req, res) => {
  try {
    const informes = await Informe.find().sort({ createdAt: -1 });
    res.json(informes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener informes" });
  }
});

// Crear un nuevo informe
router.post("/", async (req, res) => {
  try {
    const { nombre, descripcion, empresaId } = req.body;
    if (!nombre || !empresaId)
      return res.status(400).json({ error: "Nombre y empresa son obligatorios" });

    const nuevoInforme = new Informe({ nombre, descripcion, empresaId });
    await nuevoInforme.save();
    res.status(201).json(nuevoInforme);
  } catch (err) {
    console.error("❌ Error al crear informe:", err.message);
    res.status(500).json({ error: "Error al crear el informe" });
  }
});

export default router;
