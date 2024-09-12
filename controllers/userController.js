import db from '../models/index.js';



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
        const newUser = await db.User.create({
            Name,
            lastName,
            dateBirth,
            whattsap,
            identificacion,
            email,
            photo,
            password
        })
        res.status(201).json(newUser)
    } catch (error) {
        
        res.status(500).json({error: error.message})
    }
}

