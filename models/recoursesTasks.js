const RecoursesTasksModel = (sequelize, DataTypes) =>{
    const RecoursesTasks = sequelize.define('RecoursesTasks', {
      // Definición de columnas
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    typeOfRecourse: {
        type: DataTypes.ENUM('image', 'doc', 'video', 'mp3', 'dibujo', 'rar', 'link'),
        allowNull: false,
    },
    resourcePath: {
        type: DataTypes.JSON,
        allowNull: false

    },
    TaskId: {
        type: DataTypes.INTEGER,
        allowNull: false, // Obligatorio como clave foránea
        },
    },
    {
        tableName: 'RecoursesTasks', // Especifica el nombre de la tabla existente
        timestamps: false // Si no quieres createdAt y updatedAt

    });

    return RecoursesTasks;
  };
export default RecoursesTasksModel;
