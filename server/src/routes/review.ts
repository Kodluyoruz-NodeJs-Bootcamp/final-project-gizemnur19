import { Router } from "express";
import ReviewController from "../controllers/ReviewController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

// Get reviews byMovieId
router.get(
  "/:id([0-9]+)",
  checkJwt,
  ReviewController.getReviewsByMovieId
);

// Create a new movie review
router.post("/",
  checkJwt, 
  ReviewController.createMovieReview);


// Get reviews byPlayerId
router.get(
  "/player/:id([0-9]+)",
  checkJwt, 
  ReviewController.getReviewsByPlayerId
);

// Create a new player review
router.post("/player",
  checkJwt, 
  ReviewController.createPlayerReview);

export default router;