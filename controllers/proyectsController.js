import db from '../models/index.js';



export const getAllProyects = async (req, res)=>{
    try {
        const users = await db.Proyects.findAll();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


export const getProyectsTasksById = async (req, res)=>{
    try {
        const {id} = req.params;
        const proyect = await db.Proyects.findByPk(id,{
            include:{
                model: db.Tasks,
                as : 'Tasks'
            }
        });
        if (proyect) {
            res.status(200).json(proyect); // Devolver el usuario si se encuentra
        } else {
            res.status(404).json({ message: 'Proyecto no encontrada' }); // Devolver un 404 si no se encuentra el usuario
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}



export const createProyect = async(req, res)=>{
    try {
        const {
            Name,
            description,
            dateCreated,
            userCreated,
            DateModificacion,
            DateFinally,
            Priority,
            UserProyects

        } = req.body;
        const newProyect = await db.Proyects.create({
            Name,
            description,
            dateCreated,
            userCreated,
            DateModificacion,
            DateFinally,
            Priority,
            UserProyects
        })
        res.status(201).json(newProyect)
    } catch (error) {
        
        res.status(500).json({error: error.message})
    }
}

