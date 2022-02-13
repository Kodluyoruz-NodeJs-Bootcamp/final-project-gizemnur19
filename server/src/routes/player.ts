import { Router } from "express";
import PlayerController from "../controllers/PlayerController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

//Get all players
router.get("/", checkJwt,  PlayerController.listAll);

// Get one player
router.get(
  "/:id([0-9]+)",
  checkJwt, 
  PlayerController.getOneById
);

// Get players with byUserId
router.get(
  "/filter",
  checkJwt, 
  PlayerController.getPlayersByUserId
);

// Create a new player
router.post("/", 
checkJwt, 
PlayerController.createPlayer);

// Edit Player infos
router.patch(
  "/edit/:id([0-9]+)",
  checkJwt, 
  PlayerController.editPlayer
);

// share Player for user ownself records
router.patch(
  "/:id([0-9]+)",
  checkJwt, 
  PlayerController.sharePlayer
);

// Delete one player
router.delete(
  "/:id([0-9]+)",
  checkJwt, 
  PlayerController.deletePlayer
);

export default router;