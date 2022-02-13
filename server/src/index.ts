import "reflect-metadata";
import { config } from "dotenv";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import * as cors from "cors";
import routes from "./routes";
import * as passport from "passport";

//Connects to the Database -> then starts the express
createConnection()
  .then(async connection => {
    // Create a new express application instance
    const app = express();

    config();

    // Passport config
    require('./config/passport')(passport)

    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());

    // Middleware
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('public'))

    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    //Set all routes from routes folder
    app.use("/", routes);

    app.listen(3000, () => {
      console.log("Server started on port 3000!");
    });
  })
  .catch(error => console.log(error));
