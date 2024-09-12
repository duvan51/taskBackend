import Sequelize from 'sequelize';
import config from '../config/config.js';
import ProyectsModel from './proyects.js';
import ProyectsTaskModel from './proyectsTasks.js';
import RecoursesTaskModel from './recoursesTasks.js';
import TasksModel from './Tasks.js';
import TeamsModel from './teams.js';
import UserModel from './user.js';




const env = 'development';
const dbConfig = config[env];

//start database connect

let sequelize;
sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);


try {
  await sequelize.authenticate();
  console.log('Conexión establecida exitosamente');
} catch (err) {
  console.error('Error al conectar a la base de datos:', err);
}







// End database connect
const User = UserModel(sequelize, Sequelize.DataTypes);
const Proyects = ProyectsModel(sequelize, Sequelize.DataTypes);
const ProyectsTasks = ProyectsTaskModel(sequelize, Sequelize.DataTypes);
const RecoursesTasks = RecoursesTaskModel(sequelize, Sequelize.DataTypes);
const Tasks = TasksModel(sequelize, Sequelize.DataTypes);
const Teams = TeamsModel(sequelize, Sequelize.DataTypes);
//modelos de relaciones


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

Tasks.hasMany(RecoursesTasks, {foreignKey: 'ProyectsTasks'})
RecoursesTasks.belongsTo(Tasks, {foreignKey: 'ProyectsTasks'})





const encender = false; // Cambia esto a false para no sincronizar

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
  Teams
  

}; // db se define aquí



export default db;