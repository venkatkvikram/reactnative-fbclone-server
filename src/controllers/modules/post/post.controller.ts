import { Router } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Like } from "../../../db /models/Like.model";
import { Post } from "../../../db /models/Post.model";
import { User } from "../../../db /models/User.model";

export const postRouter = Router();

interface CreatePost {
  imgURL?: string;
  caption?: string;
  userId: string;
}

interface UpdatePost extends CreatePost {}

//finding all the users
postRouter.get("/", async (req, res) => {
  try { 
    const posts = await Post.findAll({
      order: [["updatedAt", "DESC"]],
      include: [User,Like]
    }); //is a method from sequelize user model
    // console.log(posts);
    return res.status(StatusCodes.OK).json({
      posts,
    });
  } catch (err: any) {
    console.log(err)
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

//getting post by unique ID
postRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findByPk(id, {
      include: [User, Like],
    }); //is a method from sequelize user model
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
    return res.status(StatusCodes.OK).json({
      post,
    });
  } catch (err: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

postRouter.post("/", async (req, res) => {
  try {
    const { userId, caption, imgURL } = req.body as CreatePost;
    console.log(userId);
    const post = await Post.create({
      userId: userId,
      caption,
      imgURL,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
    });
  } catch (err: any) {
    console.log(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

postRouter.patch("/:id", async (req, res) => {
  try {
    const { caption, imgURL } = req.body as UpdatePost;

    const id = req.params.id;

    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
    await post.update({
      //@ts-ignore
      caption: caption ?? post.caption,
      //@ts-ignore
      imgURL: imgURL ?? post.imgURL,
    });
  } catch (err: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

postRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;
    const post: any = await Post.findByPk(id); //is a method from sequelize user model
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
    if (post.UserId !== userId) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        success: false,
      });
    }
    await post.destroy();
    //TODO CHANGE STATUS CODE
    return res.status(StatusCodes.OK).json({
      success: true,
    });
  } catch (err: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

// export default router;
