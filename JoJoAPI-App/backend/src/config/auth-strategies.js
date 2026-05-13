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
    async function (request, accessToken, refreshToken, profile, done) {
      try {

        // profile contiene los datos de Google
        const { id, displayName, emails } = profile;
        const email = emails[0].value;
        const username = displayName || email.split("@")[0];

        const user = await UserModel.findOrCreate({
          username,
          email,
          provider: "google",
          provider_id: id,
        });

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    },
  ),
);
