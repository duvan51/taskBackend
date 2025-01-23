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
   // 
   // console.log('------------------------------------>>>>',authenticatedUserId)
    try {
        const {id} = req.params;
        const authenticatedUserId = req.user.id;

        const proyect = await db.Proyects.findByPk(id,{
            include:{
                model: db.Tasks,
                as : 'Tasks',
                include: [{
                    model: db.User,
                    as: 'Users'
                  },
                  {
                    model: db.Coment,
                  },
                  {
                    model: db.RecoursesTasks,
                    as: 'Recursos',
                  }
                ]    
            }
        });
        if (!proyect) {
            res.status(404).json({ message: 'Proyecto no encontrada' }); // Devolver el usuario si se encuentra
        }
        if(proyect.UserProyects !==  authenticatedUserId ){
            return res.status(403).json({ message: 'No tienes permiso para acceder a este proyecto' });
        }

        // Si todo está bien, devolver el proyecto
        res.status(200).json(proyect);



    } catch (error) {
        res.status(500).json({error: error.message})
    }
}





export const getProyectsTasksByIdByTask = async (req, res)=>{

     try {
         const {id} = req.params;
        const authenticatedUserId = req.user.id;
 
         const proyect = await db.Proyects.findByPk(id,{
             include:{
                 model: db.Tasks,
                 as : 'Tasks',
                 include: {
                     model: db.User,
                     as: 'Users',
                     through: { attributes: [] },
                     attributes: ['id', 'Name', 'email'],
                   }
             }
         });
         // Verificamos si el proyecto existe
    if (!proyect) {
        return res.status(404).json({ message: 'Proyecto no encontrado' });
      }
  
      // Filtramos las tareas para verificar si el usuario autenticado está asignado a alguna de ellas
      const userIsInTasks = proyect.Tasks.some((task) =>
        task.Users.some((user) => user.id === authenticatedUserId)
      );
  
      // Si el usuario no está asignado a ninguna tarea, devolvemos un 403 (Forbidden)
    if (!userIsInTasks) {
        return res.status(403).json({ message: 'Acceso denegado: el usuario no está asignado a este proyecto.' });
      }
  
      // Si el usuario está en alguna de las tareas, devolvemos el proyecto
      res.status(200).json(proyect);
 
 
 
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

