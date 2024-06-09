import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../Controllers/user.contollers.js";

import { upload } from "../Middlewares/multer.middleware.js";
import { verifyJWT } from "../Middlewares/auth.middleware.js";

const router =Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
                                    //for avatar
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),registerUser)

router.route("/login").post(loginUser)

//secured routes 

router.route("/logout").post(verifyJWT,logoutUser)

export default router