import Sequelize from 'sequelize';
import config from '../config/config.js';
import ProyectsModel from './proyects.js';
import ProyectsTaskModel from './proyectsTasks.js';
import RecoursesTaskModel from './recoursesTasks.js';
import ComentModel from './coments.js';
import TasksModel from './Tasks.js';
import TeamsModel from './teams.js';
import UserModel from './user.js';






// Obtener el entorno actual (development o production)
const env = process.env.NODE_ENV || 'development';


const dbConfig = config[env];




//start database connect

let sequelize;
sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);


try {
  await sequelize.authenticate();
  console.log('Conexión establecida exitosamente', dbConfig.database);
} catch (err) {
  console.log('base de datos conectada=> ',dbConfig.database)
  console.error('Error al conectar a la base de datos:', err);
}


// End database connect
const User = UserModel(sequelize, Sequelize.DataTypes);
const Proyects = ProyectsModel(sequelize, Sequelize.DataTypes);
const ProyectsTasks = ProyectsTaskModel(sequelize, Sequelize.DataTypes);
const RecoursesTasks = RecoursesTaskModel(sequelize, Sequelize.DataTypes);
const Tasks = TasksModel(sequelize, Sequelize.DataTypes);
const Teams = TeamsModel(sequelize, Sequelize.DataTypes);

const Coment = ComentModel(sequelize, Sequelize.DataTypes);




//modelos de relaciones

//Relacion de comentarios
Coment.belongsTo(User, {foreignKey: 'UserId'}) //un usuario puede hacer muchos comentarios
User.hasMany(Coment, {foreignKey: 'UserId'}) //un comentario pertenece a un usuario

Tasks.hasMany(Coment, {foreignKey: 'tasksId'}) //un usuario puede hacer muchos comentarios
Coment.belongsTo(Tasks, {foreignKey: 'tasksId'}) //un comentario pertenece a un usuario




// usuario a proyectos

User.hasMany(Proyects, {foreignKey: 'UserProyects'}); //un usuario tieene muchos proyectos
Proyects.belongsTo(User, {foreignKey: 'UserProyects'}); //un proyecto pertenece a un usuario

User.belongsToMany(Teams, {through: 'UserTeams' }) //un usuario puede tener muchos teams
Teams.belongsToMany(User, {through: 'UserTeams' }) //un teams puede estar en muchos usuarios

User.belongsToMany(Tasks, {through: 'UserTasks'}) //user muchas tasks
Tasks.belongsToMany(User, {through: 'UserTasks'}) //una tasks muchos users




Teams.belongsTo(Proyects, {foreignKey: 'TeamsProyects'})
Proyects.belongsTo(Teams, {foreignKey: 'TeamsProyects'})

Proyects.hasMany(ProyectsTasks, {foreignKey: 'ProyectsProyectsTasks'})
ProyectsTasks.belongsTo(Proyects,{foreignKey: 'ProyectsProyectsTasks'})

Proyects.hasMany(RecoursesTasks, {foreignKey: 'ProyectsProyectsTasks'})
ProyectsTasks.belongsTo(Proyects,{foreignKey: 'ProyectsProyectsTasks'})

Proyects.hasMany(Tasks, {foreignKey: 'ProyectsTasks'})
Tasks.belongsTo(Proyects, {foreignKey: 'ProyectsTasks'})

Tasks.hasMany(RecoursesTasks, { foreignKey: 'TaskId', as: 'Recursos' })
RecoursesTasks.belongsTo(Tasks, { foreignKey: 'TaskId', as: 'Tarea' })





const encender = true; // Cambia esto a false para no sincronizar

if (encender) {
  try {
    await sequelize.sync({ force: true }); // Utiliza alter: true para modificar las tablas si es necesario, sin borrar datos.
    console.log('Modelos sincronizados con la base de datos');
  } catch (err) {
    console.error('Error al sincronizar los modelos:', err);
  }
} else {
  console.log('Sincronización de modelos desactivada');
}



const db = {
  Sequelize,
  sequelize,
  User,
  Proyects,
  ProyectsTasks,
  RecoursesTasks,
  Tasks,
  Teams,
  Coment
  

}; // db se define aquí



export default db;