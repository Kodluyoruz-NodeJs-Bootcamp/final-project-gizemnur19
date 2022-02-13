// import all the things we need  
const GoogleStrategy = require('passport-google-oauth20').Strategy;
import { User } from "../entity/User";
import { getRepository } from "typeorm";
import config from "../config/config";
import * as bcrypt from "bcryptjs";

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
        signIn:true
      },
      async (accessToken, refreshToken, profile, done) => {

        //get the user data from google 
        const newUser = {
          username:profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          password: bcrypt.hashSync(profile.emails[0].value, 8),
        }

        console.log("newUser", newUser);

        const userRepository = getRepository(User);

        try {
          //find the user in our database 
          let user = await userRepository.findOne({ where: { username:profile.emails[0].value } });
          if (user) {
            //If user present in our database.
            done(null, user)
          } else {
            // if user is not preset in our database save user data to database.
            user = await userRepository.save(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    let user =  User.findOneOrFail({ where: { id } });
    done(null, user);
  })


}