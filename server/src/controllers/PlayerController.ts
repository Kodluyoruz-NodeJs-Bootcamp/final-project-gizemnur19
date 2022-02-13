
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Player } from "../entity/Player";

class PlayerController {

  static listAll = async (req: Request, res: Response) => {
    //Get players from database
    const players = await Player.find({
      select: ["id", "playerName", "likeCount"],
      where: { isShow: 1 }
    });

    //Send the players object
    res.send(players);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: string = req.params.id;

    try {
      const player = await Player.findOneOrFail(id, {
        select: ["playerName"]
      });
      res.send(player);
    } catch (error) {
      res.status(404).send("Player not found");
    }
  };

  static getPlayersByUserId = async (req: Request, res: Response) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    //Get the player from database
    try {
      const player = await Player.find({
        select: ["id", "playerName", "isShow","likeCount"],
        where: { userId: id }
      });
      res.send(player);
    } catch (error) {
      res.status(404).send("Player not found");
    }
  };

  static createPlayer = async (req: Request, res: Response) => {
    //Get the user ID from previous midleware
    const userId = res.locals.jwtPayload.userId;

    //Get parameters from the body
    let { playerName } = req.body;

    let player = new Player();

    player.playerName = playerName;
    player.isShow = false;
    player.likeCount = 0;
    player.userId = userId;

    //Validade if the parameters are ok
    const errors = await validate(player);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to save. If fails, the username is already in use
    try {
      await Player.save(player);
    } catch (e) {
      res.status(409).send("Player already in use");
      return;
    }

    //If all ok, send 201 response
    res.status(201).json({
      msg: "Player saved successfully!",
      player,
    });

  };

  static editPlayer = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { playerName, likeCount } = req.body;

    //Try to find player on database
    let player;
    try {
      player = await Player.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Player not found");
      return;
    }

     //Validate the new values on model
    if(playerName){
      player.playerName = playerName;
    }else if(likeCount){
      player.likeCount = player.likeCount + 1;
    }

    const errors = await validate(player);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means player already in use
    try {
      await Player.save(player);
    } catch (e) {
      res.status(409).send("player already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static sharePlayer = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Try to find player on database
    let player;
    try {
      player = await Player.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Player not found");
      return;
    }

    //Validate the new values on model
    player.isShow = true;
    if(player.likeCount==0){
      player.likeCount = player.likeCount + 1;
    }

    const errors = await validate(player);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means player already in use
    try {
      await Player.save(player);
    } catch (e) {
      res.status(409).send("player already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static deletePlayer = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    let player: Player;
    try {
      player = await Player.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Player not found");
      return;
    }
    Player.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
};

export default PlayerController;
