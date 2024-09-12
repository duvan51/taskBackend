import express from 'express';
import { getAllUsers, 
         createUser,
         getUserById,
         getUserProyectsById
} from '../controllers/userController.js';


const router = express.Router();

// Aplicar middleware de autenticación a todas las rutas
//router.use(authenticate);


router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/userproyects/:id', getUserProyectsById);
router.post('/', createUser);




// Define otras rutas según sea necesario

export default router;