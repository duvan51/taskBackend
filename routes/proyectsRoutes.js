import express from 'express';
import { 
        getAllProyects,
        createProyect,
        getProyectsTasksById,
        getProyectsTasksByIdByTask
        
} from '../controllers/proyectsController.js';
import verifyToken from '../middlewares/authMiddleware.js';


const router = express.Router();

// Aplicar middleware de autenticación a todas las rutas
//router.use(authenticate);


router.get('/', getAllProyects);
router.get('/:id',verifyToken, getProyectsTasksById);
router.get('/shared/:id',verifyToken, getProyectsTasksByIdByTask);
router.post('/', createProyect);




// Define otras rutas según sea necesario

export default router;