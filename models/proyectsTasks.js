const ProyectsTasksModel = (sequelize, DataTypes) =>{
    const ProyectsTasks = sequelize.define('ProyectsTasks', {
      // Definición de columnas
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      typeOfRecourse:{
        type: DataTypes.ENUM('image','doc','video','mp3','dibujo','rar','link'),
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false
    },
    doc:{
        type: DataTypes.STRING,
        allowNull: false
    },
    mp3:{
        type: DataTypes.STRING,
        allowNull: false
    },
    dibujo:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rar:{
        type: DataTypes.STRING,
        allowNull: false
    },
    link:{
        type: DataTypes.STRING,
        allowNull: false
    }
    },
    {
        tableName: 'ProyectsTasks', // Especifica el nombre de la tabla existente
        timestamps: false // Si no quieres createdAt y updatedAt

    });

    return ProyectsTasks;
  };
export default ProyectsTasksModel;