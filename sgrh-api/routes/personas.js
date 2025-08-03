import express from "express";
import bcrypt from "bcryptjs";
import Persona from "../models/Persona.js";

const router = express.Router();

// POST /api/personas
router.post("/", async (req, res) => {
  try {
    console.log("📩 Datos persona recibidos:", req.body);

    // Encriptar la contraseña antes de guardar
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

// GET /api/personas
router.get("/", async (req, res) => {
  try {
    const personas = await Persona.find().select("-password"); // 🔹 No enviamos la contraseña
    res.json(personas);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener personas" });
  }
});

// PUT /api/personas/:id
router.put("/:id", async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Si envían password, la encriptamos
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
