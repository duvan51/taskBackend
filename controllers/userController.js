import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



export const getAllUsers = async (req, res) => {
    try {
      const users = await db.User.findAll({
        include: [
          {
            model: db.Proyects, // Incluye los proyectos asociados al usuario
            as: 'Proyects',
            include: [
              {
                model: db.Tasks, // Incluye las tareas dentro de los proyectos
                as: 'Tasks',
                include: [
                  {
                  model: db.User, // Para cada tarea, también incluye los usuarios asociados
                  as: 'Users',
                  },
                  {
                    model: db.Coment // Para cada tarea, también incluye los usuarios asociados
                  },
                  {
                    model: db.RecoursesTasks,
                    as: 'Recursos',
                  }
                ],
              },
            ],
          },
          {
            model: db.Tasks, // Incluye las tareas directamente asociadas al usuario
            as: 'Tasks',
            through: { attributes: [] }, // Excluye los atributos de la tabla intermedia si no son necesarios
          },
        ],
      });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };




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
          include: [
            {
              model: db.Proyects, // Incluye los proyectos asociados al usuario
              as: 'Proyects',
              include: [
                {
                  model: db.Tasks, // Incluye las tareas dentro de los proyectos
                  as: 'Tasks',
                  include: [
                    {
                    model: db.User, // Para cada tarea, también incluye los usuarios asociados
                    as: 'Users',
                    },
                    {
                      model: db.Coment // Para cada tarea, también incluye los usuarios asociados
                    },
                    {
                      model: db.RecoursesTasks,
                      as: 'Recursos',
                    }
                  ],
                },
              ],
            },
            {
              model: db.Tasks, // Incluye las tareas directamente asociadas al usuario
              as: 'Tasks',
              through: { attributes: [] }, // Excluye los atributos de la tabla intermedia si no son necesarios
            },
          ],
            
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



export const updateUser = async (req, res) => {
    const { id } = req.params; // ID de la tarea que se va a actualizar
    const {
        Name,
        userName,
        DateBirth,
        whattsap,
        identificacion,
        email,
        photo,
        password
     } = req.body; // Los campos a actualizar
  
    try {
      // Encuentra la tarea por ID
      const user = await db.User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User no encontrado' });
      }
  
      // Actualiza los campos de la tarea
      user.Name = Name || user.Name;
      user.userName = userName || user.userName;
      user.DateBirth =  DateBirth || user.DateBirth;
      user. whattsap =  whattsap || user. whattsap;

      user.identificacion = identificacion || user.identificacion;
      user.email = email || user.email;
      user.photo =  photo || user.photo;
      user.password =  password || user.password;
  
      // Guarda los cambios
      await user.save();
  
      res.status(200).json(user); // Devuelve la tarea actualizada
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };