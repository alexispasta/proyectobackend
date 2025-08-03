import express from "express";
import Reporte from "../models/Reportes.js";

const router = express.Router();

// Obtener todos los reportes
router.get("/", async (req, res) => {
  try {
    const reportes = await Reporte.find().populate("empleadoId", "nombre apellido documento").sort({ createdAt: -1 });
    res.json(reportes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener reportes" });
  }
});

// Crear un reporte
router.post("/", async (req, res) => {
  try {
    const nuevoReporte = new Reporte(req.body);
    await nuevoReporte.save();
    res.status(201).json({ message: "Reporte creado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al crear el reporte" });
  }
});

export default router;
