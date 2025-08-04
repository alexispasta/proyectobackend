import express from "express";
import Nomina from "../models/Nomina.js";

const router = express.Router();

// 🔹 Crear nómina
router.post("/", async (req, res) => {
  try {
    const nuevaNomina = new Nomina(req.body);
    const nominaGuardada = await nuevaNomina.save();
    res.status(201).json(nominaGuardada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 Obtener todas las nóminas de una empresa
router.get("/empresa/:empresaId", async (req, res) => {
  try {
    const nominas = await Nomina.find({ empresaId: req.params.empresaId });
    res.json(nominas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔹 Actualizar nómina
router.put("/:id", async (req, res) => {
  try {
    const nominaActualizada = await Nomina.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!nominaActualizada) return res.status(404).json({ error: "Nómina no encontrada" });
    res.json(nominaActualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 Eliminar nómina
router.delete("/:id", async (req, res) => {
  try {
    const nominaEliminada = await Nomina.findByIdAndDelete(req.params.id);
    if (!nominaEliminada) return res.status(404).json({ error: "Nómina no encontrada" });
    res.json({ mensaje: "Nómina eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
