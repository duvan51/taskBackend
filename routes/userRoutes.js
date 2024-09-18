import express from 'express';
import { getAllUsers, 
         createUser,
         getUserById,
         getUserProyectsById,
         login
} from '../controllers/userController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();



// Aplicar middleware de autenticación a todas las rutas
//router.use(authenticate);


router.get('/', getAllUsers); // esta rutra es solo de produccion

router.get('/:id', verifyToken, getUserById);
router.get('/userproyects/:id', verifyToken,  getUserProyectsById);


//rutas publicas
router.post('/', createUser);
router.post('/login', login);



// Define otras rutas según sea necesario

export default router;
