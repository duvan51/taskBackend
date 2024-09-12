const TasksModel = (sequelize, DataTypes) =>{
    const Tasks = sequelize.define('Tasks', {
      // Definición de columnas
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    dateCreated:{
        type: DataTypes.DATE,
        allowNull: false
    },
    DateFinally:{
        type: DataTypes.DATE,
        allowNull: false
    },
    state:{
        type: DataTypes.ENUM('programada','proceso','revision','cancelada','finalizada'),
        allowNull: false
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }

    },
    {
        tableName: 'Tasks', // Especifica el nombre de la tabla existente
        timestamps: false // Si no quieres createdAt y updatedAt

    });

    


    return Tasks;
  };
export default TasksModel;