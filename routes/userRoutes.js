import express from 'express';
import { getAllUsers, 
         createUser,
         getUserById,
         getUserProyectsById,
         login,
         updateUser
} from '../controllers/userController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();



// Aplicar middleware de autenticación a todas las rutas
//router.use(authenticate);

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Peticiones relacionadas con User
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags: [User]
 *    
 *     summary: Return the list of all Users
 *     description: Retrieve a list of all Users records from the database.
 *     responses:
 *       200:
 *         description: A list of Users items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', getAllUsers); // esta rutra es solo de produccion


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags: [User]
 *     summary: Retrieve a user by ID
 *     description: Get the details of a specific user by their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique ID of the user to retrieve
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Details of the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get('/:id', verifyToken, getUserById);







router.get('/userproyects/:id', verifyToken,  getUserProyectsById);
router.put('/:id', verifyToken,  updateUser);

//rutas publicas
router.post('/', createUser);
router.post('/login', login);



// Define otras rutas según sea necesario

export default router;
