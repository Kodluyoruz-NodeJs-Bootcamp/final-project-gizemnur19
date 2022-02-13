
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { Movie } from "../entity/Movie";

class MovieController {

  static listAll = async (req: Request, res: Response) => {
    //Get movies from database
    const movies = await Movie.find({
      select: ["id", "movieName", "category", "likeCount"],
      where: { isShow: 1 }
    });

    //Send the movies object
    res.send(movies);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: string = req.params.id;

    try {
      const movie = await Movie.findOneOrFail(id, {
        select: ["movieName", "category"]
      });
      res.send(movie);
    } catch (error) {
      res.status(404).send("Movie not found");
    }
  };

  static getMoviesByUserId = async (req: Request, res: Response) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    //Get the movie from database
    try {
      const movie = await Movie.find({
        select: ["id", "movieName", "category", "isShow", "likeCount"],
        where: { userId: id }
      });
      res.send(movie);
    } catch (error) {
      res.status(404).send("User not found");
    }
  };

  static createMovie = async (req: Request, res: Response) => {
    //Get the user ID from previous midleware
    const userId = res.locals.jwtPayload.userId;

    //Get parameters from the body
    let { movieName,category } = req.body;

    let movie = new Movie();

    movie.movieName = movieName;
    movie.category=category;
    movie.isShow = false;
    movie.likeCount = 0;
    movie.userId = userId;

    //Validade if the parameters are ok
    const errors = await validate(movie);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to save. If fails, the username is already in use
    try {
      await Movie.save(movie);
    } catch (e) {
      res.status(409).send("Movie already in use");
      return;
    }

    //If all ok, send 201 response
    res.status(201).json({
      msg: "Movie saved successfully!",
      movie,
    });

  };

  static editMovie = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    console.log("req.body",req.body);

    //Get values from the body
    const { movieName, category, likeCount } = req.body;

    //Try to find movie on database
    let movie;
    try {
      movie = await Movie.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Movie not found");
      return;
    }
    
     //Validate the new values on model
    if(movieName && category){
      movie.movieName = movieName;
      movie.category=category;
    }else if(likeCount){
      movie.likeCount = movie.likeCount + 1;
    }

    const errors = await validate(movie);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means moviename already in use
    try {
      await Movie.save(movie);
    } catch (e) {
      res.status(409).send("moviename already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static shareMovie = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    //Try to find movie on database
    let movie;
    try {
      movie = await Movie.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send("Movie not found");
      return;
    }

    //Validate the new values on model
    movie.isShow = true;
    if(movie.likeCount==0){
      movie.likeCount = movie.likeCount + 1;
    }

    const errors = await validate(movie);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means moviename already in use
    try {
      await Movie.save(movie);
    } catch (e) {
      res.status(409).send("moviename already in use");
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };

  static deleteMovie = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    let movie: Movie;
    try {
      movie = await Movie.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Movie not found");
      return;
    }
    Movie.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
};

export default MovieController;
