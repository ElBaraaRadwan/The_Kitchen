const GoogleStrategy = require("passport-google-oauth20").Strategy,
  FacebookStrategy = require("passport-facebook").Strategy,
  User = require("../Schema/User.Schema"),
  generateUsername = require("../../../Utils/nameGenerator"),
  asyncWrapper = require("../../../Middlewares/async");

module.exports = {
  googleStrategy: function (passport) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: `http://localhost:${
            process.env.PORT || 3000
          }/auth/google/callback`,
        },
        async (req, accessToken, refreshToken, profile, done) => {
          const newUser = {
            userID: `GoogleID_${profile.id}`,
            username: profile.username || generateUsername(profile),
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            avatar: profile.photos[0].value,
          };
          
          try {
            let user = await User.findOne({ userID: profile.id })
  
            if (user) {
              done(null, user)
            } else {
              user = await User.create(newUser)
              done(null, user)
            }
          } catch (err) {
            console.error(err)
          }
        })
    );

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => done(err, user));
    });
  },

  facebookStrategy: function (passport) {
    // Use facebook strategy
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_CLIENT_ID,
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
          callbackURL: `http://localhost:${
            process.env.PORT || 3000
          }/auth/facebook/callback`,
          profileFields: [
            "id",
            "displayName",
            "name",
            "picture.type(large)",
            "email",
          ],
          enableProof: true,
        },
        async (req, accessToken, refreshToken, profile, done) => {
          const newUser = {
            userID: `FacebookID_${profile.id}`,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.emails ? profile.emails[0].value : undefined,
            username: profile.username || generateUsername(profile),
            profileImageURL: profile.photos[0].value,
          };

          try {
            let user = await User.findOne({ userID: profile.id })
  
            if (user) {
              done(null, user)
            } else {
              user = await User.create(newUser)
              done(null, user)
            }
          } catch (err) {
            console.error(err)
          }
        })
    );

    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => done(err, user));
    });
  },
};
