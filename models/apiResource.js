"use strict";

module.exports = (sequelize, DataTypes) => {
  const ApiResource = sequelize.define(
    "apiResources",
    {
      resourceId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      resourceName: {
        type: DataTypes.STRING(200),
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.fn("NOW"),
      },
    },
    {
      freezeTableName: true,
      tableName: "apiResources",
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  ApiResource.associate = (db) => {
    db.ApiResource.belongsToMany(db.UserApp, {
      through: "appApiScopes",
      foreignKey: "resourceId",
      otherKey: "appId",
    });
  };

  return ApiResource;
};
