import express from 'express';
import { 
        getAllProyects,
        createProyect,
        getProyectsTasksById
        
} from '../controllers/proyectsController.js';


const router = express.Router();

// Aplicar middleware de autenticación a todas las rutas
//router.use(authenticate);


router.get('/', getAllProyects);
router.get('/:id', getProyectsTasksById);
router.post('/', createProyect);




// Define otras rutas según sea necesario

export default router;