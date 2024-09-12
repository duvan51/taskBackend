import express from 'express';
import { getAllTasks, 
         getTaskById,
         createTask,
         updateOrder,
         updateTask,
         updateState

         
} from '../controllers/TaskController.js';


const router = express.Router();

// Aplicar middleware de autenticación a todas las rutas
//router.use(authenticate);


router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:id', getTaskById);
router.put('/updateOrder', updateOrder);
router.put('/:id', updateTask);

router.put('/:id', updateState)




// Define otras rutas según sea necesario

export default router;