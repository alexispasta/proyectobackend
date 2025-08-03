import express from "express";
import Asistencia from "../models/Asistencia.js";

const router = express.Router();

/**
 * POST /api/gerente/asistencia
 * Guarda varios registros de asistencia enviados desde el frontend
 */
router.post("/", async (req, res) => {
  try {
    console.log("📩 Datos de asistencia recibidos:", req.body);

    // Validar que sea un array
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: "El cuerpo debe ser un array de asistencias" });
    }

    // Guardar todas las asistencias
    await Asistencia.insertMany(req.body);
    res.json({ message: "Asistencia guardada correctamente ✅" });
  } catch (error) {
    console.error("❌ Error al guardar asistencia:", error);
    res.status(500).json({ error: "Error al guardar asistencia" });
  }
});

/**
 * GET /api/gerente/asistencia
 * Devuelve todas las asistencias registradas
 */
router.get("/", async (req, res) => {
  try {
    const asistencias = await Asistencia.find().sort({ fecha: -1 });
    res.json(asistencias);
  } catch (error) {
    console.error("❌ Error al obtener asistencias:", error);
    res.status(500).json({ error: "Error al obtener asistencias" });
  }
});

export default router;
