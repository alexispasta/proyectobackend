import express from "express";
import bcrypt from "bcryptjs";
import Empresa from "../models/Empresa.js";
import Persona from "../models/Persona.js";

const router = express.Router();

// 🔹 GET /api/empresas/:id - Obtener datos de la empresa
router.get("/:id", async (req, res) => {
  try {
    const empresa = await Empresa.findById(req.params.id).select("-password");
    if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });
    res.json(empresa);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la empresa" });
  }
});

// 🔹 PUT /api/empresas/:id - Actualizar datos de la empresa
router.put("/:id", async (req, res) => {
  try {
    const { nombre, pais, correo, ciudad, telefono, direccion } = req.body;

    const empresa = await Empresa.findByIdAndUpdate(
      req.params.id,
      { nombre, pais, correo, ciudad, telefono, direccion },
      { new: true, runValidators: true }
    ).select("-password");

    if (!empresa) return res.status(404).json({ error: "Empresa no encontrada" });

    res.json({ message: "Empresa actualizada correctamente", empresa });
  } catch (error) {
    console.error("❌ Error al actualizar empresa:", error.message);
    res.status(500).json({ error: "Error al actualizar empresa" });
  }
});

// 🔹 POST /api/empresas - Registrar empresa y crear gerente automáticamente
router.post("/", async (req, res) => {
  try {
    console.log("📩 Datos empresa recibidos:", req.body);

    const hashedPassword = await bcrypt.hash(req.body.passwordEmpresa, 10);

    // 1️⃣ Crear empresa
    const nuevaEmpresa = new Empresa({
      nombre: req.body.nombreEmpresa,
      correo: req.body.correoEmpresa,
      password: hashedPassword,
      pais: req.body.pais,
      telefono: req.body.telefonoEmpresa,
      direccion: req.body.direccionEmpresa,
      ciudad: req.body.ciudad
    });
    await nuevaEmpresa.save();

    // 2️⃣ Crear gerente asociado
    const nuevoGerente = new Persona({
      nombre: req.body.nombrePersona,
      apellido: req.body.apellido,
      email: req.body.email,
      password: await bcrypt.hash(req.body.passwordPersona, 10),
      telefono: req.body.telefonoPersona,
      direccion: req.body.direccionPersona,
      codigo: nuevaEmpresa._id.toString(),
      rol: "gerente",
      fecha: req.body.fecha,
      ciudad: req.body.ciudad,
      empresaId: nuevaEmpresa._id
    });
    await nuevoGerente.save();

    res.status(201).json({
      message: "✅ Empresa y gerente registrados correctamente",
      empresaId: nuevaEmpresa._id
    });

  } catch (error) {
    console.error("❌ Error al registrar empresa:", error.message);
    res.status(500).json({ error: "Error al registrar empresa" });
  }
});

export default router;
