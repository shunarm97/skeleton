const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post_images', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    post_img_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "active"
    }
  }, {
    sequelize,
    tableName: 'post_images',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "post_images_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
