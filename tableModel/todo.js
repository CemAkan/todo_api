module.exports = (sequelize, Sequelize) => {
  return sequelize.define("todo", {
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [1, 250],
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
  });
};
