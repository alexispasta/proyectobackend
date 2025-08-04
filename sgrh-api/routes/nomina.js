import express from "express";
import Nomina from "../models/Nomina.js";

const router = express.Router();

// ✅ Obtener nómina por empresa (primero)
router.get("/empresa/:empresaId", async (req, res) => {
  try {
    const { empresaId } = req.params;
    const nominas = await Nomina.find({ empresaId });
    res.json(nominas);
  } catch (error) {
    console.error("❌ Error al obtener nómina por empresa:", error.message);
    res.status(500).json({ error: "Error al obtener nómina de la empresa" });
  }
});

// GET /api/nomina - Obtener toda la nómina
router.get("/", async (req, res) => {
  try {
    const nomina = await Nomina.find();
    res.json(nomina);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener la nómina" });
  }
});

// POST /api/nomina - Crear un registro de nómina
router.post("/", async (req, res) => {
  try {
    const nuevoRegistro = new Nomina(req.body);
    await nuevoRegistro.save();
    res.status(201).json({ message: "Registro de nómina creado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al crear el registro de nómina" });
  }
});

// PUT /api/nomina/:id - Editar un registro de nómina
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
