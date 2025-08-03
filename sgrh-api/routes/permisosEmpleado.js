import express from "express";
import PermisosEmpleado from "../models/PermisosEmpleado.js";

const router = express.Router();

// Obtener todas las solicitudes de empleados
router.get("/", async (req, res) => {
  try {
    const permisos = await PermisosEmpleado.find();
    res.json(permisos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener permisos de empleados" });
  }
});

// Crear una nueva solicitud
router.post("/", async (req, res) => {
  try {
    const nuevoPermiso = new PermisosEmpleado(req.body);
    await nuevoPermiso.save();
    res.status(201).json({ message: "Solicitud enviada correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al enviar la solicitud" });
  }
});

// Actualizar estado del permiso (para el gerente)
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await PermisosEmpleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ error: "Solicitud no encontrada" });
    res.json({ message: "Solicitud actualizada", data: actualizado });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la solicitud" });
  }
});

export default router;
