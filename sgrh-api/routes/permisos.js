import express from "express";
import Permisos from "../models/Permisos.js";

const router = express.Router();

// Obtener todos los permisos
router.get("/", async (req, res) => {
  try {
    const permisos = await Permisos.find();
    res.json(permisos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los permisos" });
  }
});

// Crear una nueva solicitud de permiso
router.post("/", async (req, res) => {
  try {
    const nuevoPermiso = new Permisos(req.body);
    await nuevoPermiso.save();
    res.status(201).json({ message: "Solicitud de permiso creada correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al crear el permiso" });
  }
});

// Actualizar estado del permiso
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Permisos.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ error: "Permiso no encontrado" });
    res.json({ message: "Permiso actualizado correctamente", data: actualizado });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar el permiso" });
  }
});

export default router;
