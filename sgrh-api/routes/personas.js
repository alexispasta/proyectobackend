import express from "express";
import bcrypt from "bcryptjs";
import Persona from "../models/Persona.js";

const router = express.Router();

// POST /api/personas - Crear persona
router.post("/", async (req, res) => {
  try {
    console.log("📩 Datos persona recibidos:", req.body);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const nuevaPersona = new Persona({
      ...req.body,
      password: hashedPassword
    });

    await nuevaPersona.save();
    res.status(201).json({ message: "Persona registrada correctamente" });
  } catch (error) {
    console.error("❌ Error al registrar persona:", error.message);
    res.status(500).json({ error: "Error al registrar persona" });
  }
});

// ✅ Obtener personas por empresa (primero)
router.get("/empresa/:empresaId", async (req, res) => {
  try {
    const { empresaId } = req.params;
    const personas = await Persona.find({ empresaId }).select("-password");
    res.json(personas);
  } catch (error) {
    console.error("❌ Error al obtener personas por empresa:", error.message);
    res.status(500).json({ error: "Error al obtener personas de la empresa" });
  }
});

// GET /api/personas - Obtener todas
router.get("/", async (req, res) => {
  try {
    const personas = await Persona.find().select("-password");
    res.json(personas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener personas" });
  }
});

// GET /api/personas/:id
router.get("/:id", async (req, res) => {
  try {
    const persona = await Persona.findById(req.params.id).select("-password");
    if (!persona) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(persona);
  } catch (error) {
    console.error("❌ Error al obtener usuario:", error.message);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});

// PUT /api/personas/:id - Actualizar persona
router.put("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const persona = await Persona.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!persona) return res.status(404).json({ error: "Empleado no encontrado" });

    res.json({ message: "Empleado actualizado", persona });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar empleado" });
  }
});

export default router;
