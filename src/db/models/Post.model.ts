import { DataTypes } from "sequelize";
import { postRouter } from "../../controllers/modules/post/post.controller";
import sequelize from "../../connectDB";
import { User } from "./User.model";
// import { User } from "./User.model";

export const Post = sequelize.define('Post',{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    caption: {
        type: DataTypes.TEXT,   
    },
    imgURL: {
        type: DataTypes.STRING,
    },
    
    userId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: "id",   //by using user's unique id from User.model.ts we can that particular user's UserId

        },
        onDelete: "CASCADE", //on delete delete the whole thing.
        allowNull: false
    }
});

// Post.sync();
// TODO
// ~Add checks so that both caption and imgUrl can't be null.