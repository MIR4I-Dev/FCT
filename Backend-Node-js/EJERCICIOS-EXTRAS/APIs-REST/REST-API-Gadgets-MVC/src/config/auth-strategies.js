import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, PORT } from "./config.js";
import passport from "passport";
import { UserModel } from "../models/mysql/users.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `http://localhost:${PORT}/users/google/callback`,
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      // profile contiene los datos de Google
      UserModel.findOrCreate({
        username: profile.displayName,
        provider: "google",
        provider_id: profile.id,
      })
        .then((user) => done(null, user))
        .catch((err) => done(err));
    },
  ),
);
