import express from "express";
import Asistencia from "../models/Asistencia.js";

const router = express.Router();

/**
 * POST /api/gerente/asistencia
 */
router.post("/", async (req, res) => {
  try {
    console.log("📩 Datos de asistencia recibidos:", req.body);

    // Validar que sea un array
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: "El cuerpo debe ser un array de asistencias" });
    }

    // Validar que todos los registros tengan los campos requeridos
    for (const reg of req.body) {
      if (!reg.documento || !reg.fecha || !reg.estado) {
        return res.status(400).json({ error: "Faltan campos obligatorios en algún registro" });
      }
    }

    // Insertar en DB
    await Asistencia.insertMany(req.body);
    res.json({ message: "Asistencia guardada correctamente ✅" });
  } catch (error) {
    console.error("❌ Error al guardar asistencia:", error.message);
    res.status(500).json({ error: "Error al guardar asistencia: " + error.message });
  }
});

/**
 * GET /api/gerente/asistencia
 */
router.get("/", async (req, res) => {
  try {
    const asistencias = await Asistencia.find().sort({ fecha: -1 });
    res.json(asistencias);
  } catch (error) {
    console.error("❌ Error al obtener asistencias:", error.message);
    res.status(500).json({ error: "Error al obtener asistencias" });
  }
});

export default router;
