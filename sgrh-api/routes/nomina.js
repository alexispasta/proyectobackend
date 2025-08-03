// sgrh-api/routes/nomina.js
import express from "express";
import Nomina from "../models/Nomina.js";

const router = express.Router();

// Obtener toda la nómina
router.get("/", async (req, res) => {
  try {
    const nomina = await Nomina.find();
    res.json(nomina);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la nómina" });
  }
});

// Crear un registro de nómina
router.post("/", async (req, res) => {
  try {
    const nuevoRegistro = new Nomina(req.body);
    await nuevoRegistro.save();
    res.status(201).json({ message: "Registro de nómina creado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al crear el registro de nómina" });
  }
});

// Editar un registro de nómina
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Nomina.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ error: "Registro no encontrado" });
    res.json({ message: "Nómina actualizada correctamente", data: actualizado });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar la nómina" });
  }
});

export default router;
