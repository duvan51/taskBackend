const TeamsModel = (sequelize, DataTypes) =>{
    const Teams = sequelize.define('Teams', {
      // Definición de columnas
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email:{
        type: DataTypes.CHAR,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true
        }
    },
    cargo:{
        type: DataTypes.STRING,
        allowNull: false
    }
    

    },
    {
        tableName: 'Teams', // Especifica el nombre de la tabla existente
        timestamps: false // Si no quieres createdAt y updatedAt

    });

    return Teams;
  };
export default TeamsModel;