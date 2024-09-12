import express from 'express';
import userRoutes from './routes/userRoutes.js';
import proyectsRoutes from './routes/proyectsRoutes.js'
import TaskRoutes from './routes/tasksRoutes.js'




const app = express();
const PORT = 4000;

// Exportar función
app.use(express.json());

app.use('/users', userRoutes)
app.use('/proyects', proyectsRoutes)
app.use('/tasks', TaskRoutes)





app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
