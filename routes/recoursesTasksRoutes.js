import express from 'express';
import { 
    addRecoursesTasks

} from '../controllers/recoursesTasks.js';


const router = express.Router();

// Aplicar middleware de autenticación a todas las rutas
//router.use(authenticate);


//router.get('/', getAllTasks);
router.post('/', addRecoursesTasks);





// Define otras rutas según sea necesario

export default router;