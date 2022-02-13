import { Router } from "express";
import MovieController from "../controllers/MovieController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

//Get all movies
router.get("/", checkJwt, MovieController.listAll);

// Get one movie
router.get(
  "/:id([0-9]+)",
  checkJwt, 
  MovieController.getOneById
);

// Get movies with byUserId
router.get(
  "/filter",
  checkJwt, 
  MovieController.getMoviesByUserId
);

// Create a new movie
router.post("/", 
checkJwt, 
MovieController.createMovie);

// Edit Movie infos
router.patch(
  "/edit/:id([0-9]+)",
  checkJwt, 
  MovieController.editMovie
);

// share Movie for user ownself records
router.patch(
  "/:id([0-9]+)",
  checkJwt, 
  MovieController.shareMovie
);

// Delete one movie
router.delete(
  "/:id([0-9]+)",
  checkJwt, 
  MovieController.deleteMovie
);

export default router;