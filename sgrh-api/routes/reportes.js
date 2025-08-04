import express from "express";
import Reporte from "../models/Reportes.js";

const router = express.Router();

// ✅ Obtener reportes por empresa
router.get("/empresa/:empresaId", async (req, res) => {
  try {
    const { empresaId } = req.params;
    const reportes = await Reporte.find({ empresaId })
      .populate("empleadoId", "nombre apellido codigo") // 🔹 trae los datos del empleado
      .sort({ createdAt: -1 });
    res.json(reportes);
  } catch (error) {
    console.error("❌ Error al obtener reportes por empresa:", error.message);
    res.status(500).json({ error: "Error al obtener reportes de la empresa" });
  }
});

// ✅ Obtener todos los reportes
router.get("/", async (req, res) => {
  try {
    const reportes = await Reporte.find()
      .populate("empleadoId", "nombre apellido codigo")
      .sort({ createdAt: -1 });
    res.json(reportes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener reportes" });
  }
});

// ✅ Crear un reporte
router.post("/", async (req, res) => {
  try {
    const { asunto, descripcion, empleadoId, empresaId } = req.body;

    if (!asunto || !descripcion || !empleadoId || !empresaId) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const nuevoReporte = new Reporte({
      asunto,
      descripcion,
      empleadoId,
      empresaId,
    });

    await nuevoReporte.save();

    // 🔹 Retornamos el reporte creado con populate
    const reporteConEmpleado = await Reporte.findById(nuevoReporte._id)
      .populate("empleadoId", "nombre apellido codigo");

    res.status(201).json(reporteConEmpleado);
  } catch (err) {
    console.error("❌ Error al crear reporte:", err.message);
    res.status(500).json({ error: "Error al crear el reporte" });
  }
});

export default router;
