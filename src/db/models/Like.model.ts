import { DataTypes } from "sequelize";
import { postRouter } from "../../controllers/modules/post/post.controller";
import sequelize from "../../connectDB";
import { User } from "./User.model";
import { Post } from "./Post.model";
import { isDataView } from "util/types";
// import { User } from "./User.model";

export const Like = sequelize.define('Like',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        unique: "composite-index"
    },
    postId: {
        type: DataTypes.UUID,
        references: {
            model: Post,
            key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
        unique: "composite-index"
    }
});

Like.belongsTo(User, {
    onDelete: "CASCADE",foreignKey: "userId" 
});
User.hasMany(Like);

Like.belongsTo(Post);
Post.hasMany(Like,  {
    onDelete: "CASCADE",foreignKey: "postId"
});

// Like.sync();
// TODO
// ~Add relation between user and post
// ~Add checks so that both caption and imgUrl can't be null.