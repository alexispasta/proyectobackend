import express from "express";
import Informe from "../models/Informes.js";

const router = express.Router();

// Obtener todos los informes
router.get("/", async (req, res) => {
  try {
    const informes = await Informe.find().sort({ createdAt: -1 });
    res.json(informes);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener informes" });
  }
});

// Crear un nuevo informe
router.post("/", async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre) return res.status(400).json({ error: "El nombre es obligatorio" });

    const nuevoInforme = new Informe({ nombre, descripcion });
    await nuevoInforme.save();
    res.status(201).json(nuevoInforme);
  } catch (err) {
    res.status(500).json({ error: "Error al crear el informe" });
  }
});

export default router;
