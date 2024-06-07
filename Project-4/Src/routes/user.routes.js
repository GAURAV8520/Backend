import { Router } from "express";
import { registerUser } from "../Controllers/user.contollers.js";

import { upload } from "../Middlewares/multer.middleware.js";

const router =Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
                                    //for avatar
        },
        {
            name:"CoverImage",
            maxCount:1
        }
    ]),registerUser)

export default router