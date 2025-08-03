import express from "express";
import bcrypt from "bcryptjs";
import Empresa from "../models/Empresa.js";
import Persona from "../models/Persona.js";

const router = express.Router();

// POST /api/empresas - registrar empresa y crear usuario gerente
router.post("/", async (req, res) => {
  try {
    console.log("📩 Datos empresa recibidos:", req.body);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // 1️⃣ Guardar empresa
    const nuevaEmpresa = new Empresa({
      nombre: req.body.nombre,
      correo: req.body.correo,
      password: hashedPassword,
      pais: req.body.pais,
      telefono: req.body.telefono,
      direccion: req.body.direccion
    });
    await nuevaEmpresa.save();

    // 2️⃣ Crear automáticamente un usuario gerente asociado
    const nuevoGerente = new Persona({
      nombre: req.body.nombre,       // puedes usar el mismo nombre
      apellido: "Gerente",
      email: req.body.correo,
      password: hashedPassword,
      telefono: req.body.telefono,
      direccion: req.body.direccion,
      codigo: nuevaEmpresa._id,      // el ID de la empresa como código
      rol: "gerente",
      fecha: new Date().toISOString().split("T")[0],
      ciudad: req.body.pais
    });
    await nuevoGerente.save();

    res.status(201).json({
      message: "Empresa registrada correctamente. Usuario gerente creado."
    });

  } catch (error) {
    console.error("❌ Error al registrar empresa:", error.message);
    res.status(500).json({ error: "Error al registrar empresa" });
  }
});

export default router;
