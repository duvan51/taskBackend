import express from 'express';
import { 
        addComment,
        getAllComment
        
} from '../controllers/comentController.js';
import verifyToken from '../middlewares/authMiddleware.js';


const router = express.Router();

// Aplicar middleware de autenticación a todas las rutas
//router.use(authenticate);


router.post('/', addComment);
router.get('/', getAllComment);



// Define otras rutas según sea necesario

export default router;