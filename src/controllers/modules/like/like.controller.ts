import { Router } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Like } from "../../../db /models/Like.model";
import { Post } from "../../../db /models/Post.model";

export const likeRouter = Router();

// interface CreatePost {
//   imgURL?: string;
//   caption?: string;
//   userId: string;
// }

// interface UpdatePost extends CreatePost {}
//finding all th likes for A PARTICULAR POST.
//finding all the users
// likeRouter.get("/posts/:postId", async (req, res) => {
//   try {
//     const postId = req.params.postId//is a method from sequelize user model
//     const post = await Post.findByPk(postId) 
//     if(!post) {
//         return res.status(StatusCodes.NOT_FOUND).send({message: `Post with given ID doesn't exists.`})
//     }
//     return res.status(StatusCodes.OK).json({
//       posts,
//     });
//   } catch (err: any) {
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
//   }
// });

//finding user by unique ID
// likeRouter.get("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const post = await Post.findByPk(id); //is a method from sequelize user model
//     if (!post) {
//       return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
//     }
//     return res.status(StatusCodes.OK).json({
//       post,
//     });
//   } catch (err: any) {
//     return res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
//   }
// });


//creating the like
likeRouter.post("/", async (req, res) => {
  try {
    const { userId, postId } = req.body;

   const like = await Like.create({
    userId, postId
   })
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

likeRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const like = await Like.findByPk(id); //is a method from sequelize user model
    if (!like) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
    await like.destroy();
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
