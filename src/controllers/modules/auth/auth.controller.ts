import { Router } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { User } from "../../../db /models/User.model";

export const authRouter = Router();


authRouter.post("/login", async (req,res) => {
     try {
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}})
        if(!user) 
        return res.status(StatusCodes.NOT_FOUND).json({
            message: `User with ${email} does not exists.`
        }) 
        //@ts-ignore
        if(password !== user.password)
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "Either email or password is incorrect."
        })
        return res.status(StatusCodes.OK).json({
            user,
            message: "Logged in successfully.",
            success: true,
        }) 
     } catch(err:any) {
        console.log(err)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        })
     }
})