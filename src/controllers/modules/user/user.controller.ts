import { Router } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { User } from "../../../db /models/User.model";

export const userRouter = Router();

interface CreateUser {
  userName: string;
  profileImgURL?: string;
  email: string;
  password: string;
}

interface UpdateUser extends CreateUser {}

//finding all the users
userRouter.get("/", async (req, res) => {
  try {
    const users = await User.findAll(); //is a method from sequelize user model
    return res.status(StatusCodes.OK).json({
      users,
    });
  } catch (err: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

//finding user by unique ID
userRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id); //is a method from sequelize user model
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
    return res.status(StatusCodes.OK).json({
      user,
    });
  } catch (err: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

userRouter.post("/", async (req, res) => {
  try {
    const { userName, profileImgURL, email, password } = req.body as CreateUser;

    const user = await User.create({
      userName,
      profileImgURL,
      email,
      password,
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

userRouter.patch("/:id", async (req, res) => {
  try {
    const { profileImgURL } = req.body as UpdateUser;

    const id = req.params.id;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
    await user.update(
      { profileImgURL },
      {
        fields: ["profileImgURL"],
      }
    );
    return res.status(StatusCodes.OK).json({
      success: true,
    });
  } catch (err: any) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND);
    }
    await user.destroy();
    return res.status(StatusCodes.OK).json({
      success: true,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
  }
});

// export default router;
