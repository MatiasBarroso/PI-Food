const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      summary: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      healthScore: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      stepByStep: {
        type: DataTypes.ARRAY(DataTypes.STRING(500)),
        defaultValue: [],
      },
      image: {
        type: DataTypes.STRING(500),
      },
      diets: {
        type: DataTypes.ARRAY(DataTypes.STRING(500)),
        defaultValue: [],
      },
      types: {
        type: DataTypes.ARRAY(DataTypes.STRING(500)),
        defaultValue: [],
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: false,
    }
  );
};
