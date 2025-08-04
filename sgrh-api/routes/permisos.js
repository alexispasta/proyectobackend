import express from "express";
import Permisos from "../models/Permisos.js";
import Persona from "../models/Persona.js"; // 🔹 Para obtener la empresa del empleado

const router = express.Router();

// 🔹 Obtener permisos por empresa
router.get("/empresa/:empresaId", async (req, res) => {
  try {
    const { empresaId } = req.params;
    const permisos = await Permisos.find({ empresaId }).sort({ createdAt: -1 });
    res.json(permisos);
  } catch (err) {
    console.error("❌ Error al obtener los permisos:", err);
    res.status(500).json({ error: "Error al obtener los permisos" });
  }
});

// 🔹 Obtener historial de permisos de un empleado
router.get("/empleado/:empleadoId", async (req, res) => {
  try {
    const { empleadoId } = req.params;
    const permisos = await Permisos.find({ empleadoId }).sort({ createdAt: -1 });
    res.json(permisos);
  } catch (err) {
    console.error("❌ Error al obtener permisos del empleado:", err);
    res.status(500).json({ error: "Error al obtener permisos del empleado" });
  }
});

// 🔹 Crear una nueva solicitud de permiso
router.post("/", async (req, res) => {
  try {
    console.log("📩 Datos recibidos en POST /permisos:", req.body);

    const { empleadoId, motivo, descripcion, estado, empresaId } = req.body;
    if (!empleadoId || !motivo) {
      console.warn("⚠️ Faltan datos obligatorios:", req.body);
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Si no viene la empresaId, la obtenemos del empleado
    let empresaAsociada = empresaId;
    const empleado = await Persona.findById(empleadoId);
    if (!empleado) {
      console.warn("⚠️ Empleado no encontrado con ID:", empleadoId);
      return res.status(404).json({ error: "Empleado no encontrado" });
    }
    if (!empresaAsociada) empresaAsociada = empleado.empresaId;

    const nuevoPermiso = new Permisos({
      empleadoId,
      empleadoNombre: `${empleado.nombre} ${empleado.apellido}`,
      motivo,
      descripcion,
      estado: estado || "pendiente",
      empresaId: empresaAsociada,
    });

    const permisoGuardado = await nuevoPermiso.save();
    console.log("✅ Permiso guardado correctamente:", permisoGuardado);

    res.status(201).json({ message: "Solicitud de permiso creada correctamente" });
  } catch (err) {
    console.error("❌ Error al crear el permiso:", err); // 🔹 Mostrará el error completo
    res.status(500).json({ error: "Error al crear el permiso", detalle: err.message });
  }
});

// 🔹 Actualizar estado del permiso
router.put("/:id", async (req, res) => {
  try {
    console.log("📩 Datos recibidos en PUT /permisos:", req.params.id, req.body);

    const actualizado = await Permisos.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ error: "Permiso no encontrado" });

    console.log("✅ Permiso actualizado correctamente:", actualizado);
    res.json({ message: "Permiso actualizado correctamente", data: actualizado });
  } catch (err) {
    console.error("❌ Error al actualizar el permiso:", err);
    res.status(500).json({ error: "Error al actualizar el permiso" });
  }
});

export default router;
