import express from "express";
import Empleado from "../models/Empleado.js";
import Asistencia from "../models/Asistencia.js";

const router = express.Router();

// Obtener todos los empleados
router.get("/empleados", async (req, res) => {
  try {
    const empleados = await Empleado.find();
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener empleados" });
  }
});

// Actualizar empleado
router.put("/empleado/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;
    await Empleado.findByIdAndUpdate(id, datosActualizados);
    res.json({ message: "Empleado actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar empleado" });
  }
});

// Guardar asistencia
router.post("/asistencia", async (req, res) => {
  try {
    const asistencias = req.body; // [{documento, fecha, estado}, ...]
    await Asistencia.insertMany(asistencias);
    res.json({ message: "Asistencia guardada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al guardar asistencia" });
  }
});

export default router;
