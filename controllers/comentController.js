import db from '../models/index.js';



export const getAllComment = async (req, res)=>{
    try {
        const users = await db.Coment.findAll();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


export const addComment = async(req, res)=>{
    try {
        const {
            Content,
            dateCreated,
            dateUpdate,
            photo,
            UserId,
            tasksId

        } = req.body;
        const newComent = await db.Coment.create({
            Content,
            dateCreated,
            dateUpdate,
            photo,
            UserId,
            tasksId
        })
        res.status(201).json(newComent)
    } catch (error) {
        
        res.status(500).json({error: error.message})
    }
}

