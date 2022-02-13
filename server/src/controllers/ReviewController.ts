
import { Request, Response } from "express";
import { validate } from "class-validator";
import { MovieReview } from "../entity/MovieReview";
import { PlayerReview } from "../entity/PlayerReview";

import { User } from "../entity/User";

class ReviewController {

  static getReviewsByMovieId = async (req: Request, res: Response) => {

    //Get the ID from the url
    const id: string = req.params.id;

    //Get movies from database
    try {
      const reviews = await MovieReview.find({
        select: ["reviewDescp", "username"],
      where: { movieId:id }
    });
      res.send(reviews);
      console.log("reviews", reviews);

    } catch (error) {
      res.status(404).send("Review not found");
    }
 
  };

  static createMovieReview = async (req: Request, res: Response) => {

    //Get the user ID from previous midleware
    const userId = res.locals.jwtPayload.userId;

    const user = await User.findOneOrFail(userId, {
      select: [ "username" ]
    });

    //Get parameters from the body
    let { movieId,comment } = req.body;

    let review = new MovieReview();

    review.movieId=movieId
    review.reviewDescp=comment;
    review.username=user.username;

    //Validade if the parameters are ok
    const errors = await validate(review);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to save. If fails, the review is already in use
    try {
      await MovieReview.save(review);
    } catch (e) {
      res.status(409).send("Movie review already in use");
      return;
    }

    //If all ok, send 201 response
    res.status(201).json({
      msg: "Review saved successfully!",
      review,
    });

  };


  static getReviewsByPlayerId = async (req: Request, res: Response) => {

    //Get the ID from the url
    const id: string = req.params.id;

    //Get movies from database
    try {
      const reviews = await PlayerReview.find({
        select: ["reviewDescp", "username"],
      where: { playerId:id }
    });
      res.send(reviews);
      console.log("reviews", reviews);

    } catch (error) {
      res.status(404).send("Review not found");
    }
 
  };

  static createPlayerReview = async (req: Request, res: Response) => {

    //Get the user ID from previous midleware
    const userId = res.locals.jwtPayload.userId;

    const user = await User.findOneOrFail(userId, {
      select: [ "username" ]
    });


    //Get parameters from the body
    let { playerId,comment } = req.body;

    let review = new PlayerReview();

    review.playerId=playerId
    review.reviewDescp=comment;
    review.username=user.username;

    //Validade if the parameters are ok
    const errors = await validate(review);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to save. If fails, the review is already in use
    try {
      await PlayerReview.save(review);
    } catch (e) {
      res.status(409).send("Player review already in use");
      return;
    }

    //If all ok, send 201 response
    res.status(201).json({
      msg: "Review saved successfully!",
      review,
    });

  };

};

export default ReviewController;
