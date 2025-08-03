// sgrh-api/routes/informacion.js
import express from "express";
import Informacion from "../models/Informacion.js";

const router = express.Router();

// Obtener información por ID
router.get("/:id", async (req, res) => {
  try {
    const info = await Informacion.findById(req.params.id);
    if (!info) return res.status(404).json({ error: "Información no encontrada" });
    res.json(info);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la información" });
  }
});

// Actualizar información
router.put("/:id", async (req, res) => {
  try {
    const info = await Informacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!info) return res.status(404).json({ error: "Información no encontrada" });
    res.json({ message: "Información actualizada correctamente", info });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la información" });
  }
});

export default router;
