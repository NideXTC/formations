'use strict';
module.exports = function(sequelize, DataTypes) {
  var bike = sequelize.define('bike', {
    name: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return bike;
};