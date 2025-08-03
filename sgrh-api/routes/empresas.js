import express from "express";
import Empresa from "../models/Empresa.js";

const router = express.Router();

// POST /api/empresas - registrar una nueva empresa
router.post("/", async (req, res) => {
  try {
    console.log("📩 Datos empresa recibidos:", req.body);

    const nuevaEmpresa = new Empresa(req.body);
    await nuevaEmpresa.save();

    res.status(201).json({ message: "Empresa registrada correctamente" });
  } catch (error) {
    console.error("❌ Error al registrar empresa:", error);
    res.status(500).json({ error: "Error al registrar empresa" });
  }
});

export default router;
