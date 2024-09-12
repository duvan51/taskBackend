import db from '../models/index.js';



export const getAllTasks = async (req, res)=>{
    try {
        const Tasks = await db.Tasks.findAll({
            order: [['order', 'ASC']]
        });
        res.status(200).json(Tasks)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const getTaskById = async (req, res)=>{
    try {
        const {id} = req.params;
        const Task = await db.Tasks.findByPk(id);
        if (Task) {
            res.status(200).json(Task); // Devolver el usuario si se encuentra
        } else {
            res.status(404).json({ message: 'tarea no encontrada' }); // Devolver un 404 si no se encuentra el usuario
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const createTask = async(req, res)=>{
    try {
        const {
            Name,
            description,
            dateCreated,
            DateFinally,
            state,
            ProyectsTasks

        } = req.body;
        const newTask = await db.Tasks.create({
            Name,
            description,
            dateCreated,
            DateFinally,
            state,
            ProyectsTasks
        })
        res.status(201).json(newTask)
    } catch (error) {
        
        res.status(500).json({error: error.message})
    }
}



export const updateOrder = async (req, res) => {
    const { tasks } = req.body;

    try {
      for (let i = 0; i < tasks.length; i++) {
        await db.Tasks.update({ order: i }, { where: { id: tasks[i].id } });
      }
      res.status(200).json({ message: 'Orden actualizado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el orden de las tareas' });
    }
};



export const updateState = async (req, res) => {
    const { id } = req.params; // ID de la tarea que se va a actualizar
    const {
        state
     } = req.body; // Los campos a actualizar

  
     try {
        // Encuentra la tarea por ID
        const task = await db.Tasks.findByPk(id);
    
        if (!task) {
          return res.status(404).json({ message: 'Task no encontrada' });
        }
    
        // Actualiza el State
        task.state = state || task.state;
    
        // Guarda los cambios
        await task.save();
    
        res.status(200).json(task); // Devuelve la tarea actualizada
      } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
};






export const updateTask = async (req, res) => {
    const { id } = req.params; // ID de la tarea que se va a actualizar
    const {
        Name,
        description,
        DateFinally,
        state
     } = req.body; // Los campos a actualizar
  
    try {
      // Encuentra la tarea por ID
      const task = await db.Tasks.findByPk(id);
  
      if (!task) {
        return res.status(404).json({ message: 'Task no encontrada' });
      }
  
      // Actualiza los campos de la tarea
      task.Name = Name || task.Name;
      task.description = description || task.description;
      task.DateFinally = DateFinally || task.DateFinally;
      task.state = state || task.state;
  
      // Guarda los cambios
      await task.save();
  
      res.status(200).json(task); // Devuelve la tarea actualizada
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };