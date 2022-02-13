import { Request, Response, Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import * as passport from "passport";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

const router = Router();
//Login route
router.post("/login", AuthController.login);

//Sign up route
router.post("/register", AuthController.register);


//login with google
router.get('/google', passport.authenticate('google', { scope: ['profile','email'],  accessType: 'offline',   approvalPrompt: 'force'  }))

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login',  accessType: 'offline' }),
  (req: any, res: any) => {
    const token = jwt.sign(
      { userId: req.user.id, username: req.user.username },
      config.jwtSecret,
      { expiresIn: "1d" }
    );
    res.redirect(config.CLIENT_ADRESS+'/google-callback?token='+token);
  }
)


export default router;