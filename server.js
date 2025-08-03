import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Esto permite usar require con ESM
const require = createRequire(import.meta.url);

// Importamos rutas con require
import informacionRoutes from "./sgrh-api/routes/informacion.js";

import personasRoutes from "./sgrh-api/routes/personas.js";
import empresasRoutes from "./sgrh-api/routes/empresas.js";
import gerenteRoutes from "./sgrh-api/routes/gerente.js";
import quejasRoutes from "./sgrh-api/routes/quejas.js";
import nominaRoutes from "./sgrh-api/routes/nomina.js";
import permisosRoutes from "./sgrh-api/routes/permisos.js";
import permisosEmpleadoRoutes from "./sgrh-api/routes/permisosEmpleado.js";



console.log("Ruta actual de ejecución:", __dirname);

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/sgrh")
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error conectando a MongoDB", err));

// Rutas
app.use("/api/informacion", informacionRoutes);

app.use("/api/personas", personasRoutes);
app.use("/api/empresas", empresasRoutes);
app.use("/api/gerente", gerenteRoutes);
app.use("/api/quejas", quejasRoutes);
app.use("/api/nomina", nominaRoutes);
app.use("/api/permisos", permisosRoutes);
app.use("/api/permisosempleado", permisosEmpleadoRoutes);



app.listen(3000, () => {
  console.log("🚀 Servidor corriendo en http://localhost:3000");
});
