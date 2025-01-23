const ComentModel = (sequelize, DataTypes) =>{
    const Coment = sequelize.define('Coment', {
      // Definición de columnas
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    Content: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    dateCreated:{
        type: DataTypes.DATE,
        allowNull: true
    },
    dateUpdate:{
        type: DataTypes.DATE,
        allowNull: false
    },
    photo: {
      type: DataTypes.JSON,
        allowNull: false
    }
    },
    {
        tableName: 'Coment', // Especifica el nombre de la tabla existente
        timestamps: false // Si no quieres createdAt y updatedAt

    });

    return Coment;
  };
export default ComentModel;