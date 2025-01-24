import express from 'express';
import userRoutes from './routes/userRoutes.js';
import proyectsRoutes from './routes/proyectsRoutes.js'
import TaskRoutes from './routes/tasksRoutes.js'
import recoursesTasksRoutes from './routes/recoursesTasksRoutes.js'
import CommentRoutes from './routes/comnetRoutes.js'
import cors from 'cors'

import swaggerUI from "swagger-ui-express";
import specificationSwagger from './swagger/swagger.js';

const app = express();
const PORT = 4000;


app.use(cors())

// Exportar función
app.use(express.json());


//redireccionamiento a la ruta de swagger


app.use('/users', userRoutes)
app.use('/proyects', proyectsRoutes)
app.use('/tasks', TaskRoutes)
app.use('/recourses', recoursesTasksRoutes)
app.use('/coment', CommentRoutes)


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specificationSwagger));
  


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
