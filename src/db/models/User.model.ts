import { DataTypes } from "sequelize";
import sequelize from "../../connectDB";
import { Post } from "./Post.model";

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    field: "user-name",
  },
  profileImageURL: {
    type: DataTypes.STRING,
    field: "profile-img-url",
    defaultValue:
      "https://png.pngtree.com/png-vector/20190329/ourmid/pngtree-vector-avatar-icon-png-image_889567.jpg",
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

User.hasMany(Post, {
  
});
Post.belongsTo(User,{onDelete: "CASCADE",foreignKey: "userId"});
// User.sync({
//   force: true
// });
