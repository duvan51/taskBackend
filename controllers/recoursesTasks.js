import db from '../models/index.js';






export const addRecoursesTasks = async(req, res)=>{
    try {
        const {
            typeOfRecourse,
            resourcePath,
            TaskId
           

        } = req.body;
        const newProyect = await db.RecoursesTasks.create({
            typeOfRecourse,
            resourcePath,
            TaskId
        })
        res.status(201).json(newProyect)
    } catch (error) {
        
        res.status(500).json({error: error.message})
    }
}


