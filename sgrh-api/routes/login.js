import express from "express";
import bcrypt from "bcryptjs";
import Persona from "../models/Persona.js";

const router = express.Router();

// POST /api/login
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    // 1️⃣ Buscar usuario por email
    const user = await Persona.findOne({ email });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    // 2️⃣ Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) return res.status(401).json({ error: "Contraseña incorrecta" });

    // 3️⃣ Responder sin enviar el hash de contraseña
    res.json({
      message: "Login exitoso",
      userId: user._id,
      rol: user.rol
    });

  } catch (error) {
    console.error("❌ Error en login:", error.message);
    res.status(500).json({ error: "Error en login" });
  }
});

export default router;
