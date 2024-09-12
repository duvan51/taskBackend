const ProyectsModel = (sequelize, DataTypes) =>{
    const Proyects = sequelize.define('Proyects', {
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
        type: DataTypes.STRING,
        allowNull: false
    },
    dateCreated:{
        type: DataTypes.DATE,
        allowNull: false
    },
    userCreated:{
        type: DataTypes.STRING,
        allowNull: false
    },
    DateModificacion:{
        type: DataTypes.STRING,
        allowNull: true
    },
    DateFinally:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Priority:{
        type: DataTypes.ENUM('high','medium','low'),
        allowNull: true
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
   


    },
    {
        tableName: 'Proyects', // Especifica el nombre de la tabla existente
        timestamps: false // Si no quieres createdAt y updatedAt

    });

    return Proyects;
  };
export default ProyectsModel;