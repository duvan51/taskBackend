import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



export const getAllUsers = async (req, res)=>{
    try {
        const users = await db.User.findAll();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getUserById = async (req, res)=>{
    try {
        const {id} = req.params;
        const user = await db.User.findByPk(id);
        if (user) {
            res.status(200).json(user); // Devolver el usuario si se encuentra
        } else {
            res.status(404).json({ message: 'usuario no encontrado' }); // Devolver un 404 si no se encuentra el usuario
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}




export const getUserProyectsById = async (req, res)=>{
    try {
        const {id} = req.params;
        const user = await db.User.findByPk(id, {
            include:{
                model: db.Proyects,
                as : 'Proyects',
                include:{
                    model: db.Tasks,
                    as : 'Tasks',
                    include: {
                        model: db.User,
                        as: 'Users'
                      }
                }
            }
        });
        if (user) {
            res.status(200).json(user); // Devolver el usuario si se encuentra
        } else {
            res.status(404).json({ message: 'usuario no encontrado' }); // Devolver un 404 si no se encuentra el usuario
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}






export const createUser = async(req, res)=>{
    try {
        const {
            Name,
            lastName,
            dateBirth,
            whattsap,
            identificacion,
            email,
            photo,
            password

        } = req.body;

        //verificamos is el email ya existe
        const existingUser = await db.User.findOne({ where: { email } });
        if(existingUser){
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        //hasheamos la contrasena
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await db.User.create({
            Name,
            lastName,
            dateBirth,
            whattsap,
            identificacion,
            email,
            photo,
            password: hashedPassword
        })
        res.status(201).json(newUser)
    } catch (error) {
        
        res.status(500).json({error: error.message})
    }
}


export const login = async(req, res)=>{
    const secret_key = 's5h9$Lk29jP2!7Dszm2?GdL8wT4N&XJ@'
    try {
        const {
            email,
            password
        } = req.body;
        // Buscar el usuario en la base de datos por email
        const user = await db.User.findOne({ where: { email } });
   
        if (!user) {
        return res.status(400).json({ error: 'Usuario no encontrado' });
        }
        
        //comparar la contrasenaalmacenada 
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });

          }


         // Generar token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, secret_key, { expiresIn: '1h' });

        res.json({ token, userId :user.id  });

    } catch (error) {
        
    }
}