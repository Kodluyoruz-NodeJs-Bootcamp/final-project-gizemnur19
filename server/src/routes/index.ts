import { Router } from "express";
import auth from "./auth";
import movie from "./movie";
import review from "./review";
import player from "./player";


const routes = Router();

routes.use("/auth", auth);
routes.use("/movie", movie);
routes.use("/player", player);
routes.use("/review", review);


export default routes;
