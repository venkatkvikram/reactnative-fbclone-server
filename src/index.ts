import express from "express";
import { testDBConnection } from "./connectDB";
import { postRouter } from "./controllers/modules/post/post.controller";
import { userRouter } from "./controllers/modules/user/user.controller";
import cors from "cors";
import { likeRouter } from "./controllers/modules/like/like.controller";
import { authRouter } from "./controllers/modules/auth/auth.controller";

const app = express();

const PORT = process.env.PORT || 7001; //if the environment provides me the PORT run on it on that or else run it on 4000

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/likes", likeRouter);
app.use("/auth", authRouter)
const startServer = async () => {
  try {
    await testDBConnection();
    app.listen(PORT, () => console.info(`LISTENING ON ${PORT}`));
  } catch (err: any) {
    if (err.message) {
      console.log(err.message);
    }
    process.exit(0);
  }
};

startServer();
