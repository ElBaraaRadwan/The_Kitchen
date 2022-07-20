var passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  User = require('../Modules/Users/Schema/User.Schema')
  generateUsername = require('../Utils/nameGenerator');

module.exports = {
  googleStrategy: function(config) {
    // Use google strategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        passReqToCallback: true
      },
      async(req, accessToken, refreshToken, profile, done) => {
        // Set the provider data and include tokens
        var providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;
  
        // Create the user OAuth profile
        var providerUserProfile = {
          googleID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username || generateUsername(profile),
          profileImageURL: (providerData.picture) ? providerData.picture : undefined,
        };

        try {
          let user = await User.findOne({ googleID: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(providerUserProfile);
            done(null, user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    ));
  },

  facebookStrategy: function(config) {
    // Use facebook strategy
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "/auth/facebook/callback",
        profileFields: ['id', 'name', 'displayName', 'emails', 'photos'],
        passReqToCallback: true
      },
      async (req, accessToken, refreshToken, profile, done) => {
        // Set the provider data and include tokens
        var providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;
  
        // Create the user OAuth profile
        var providerUserProfile = {
          facebookID: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          displayName: profile.displayName,
          email: profile.emails ? profile.emails[0].value : undefined,
          username: profile.username || generateUsername(profile),
          profileImageURL: (profile.id) ? 'https://graph.facebook.com/' + profile.id + '/picture?type=large' : undefined,
        };

        try {
          let user = await User.findOne({ facebookID: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(providerUserProfile);
            done(null, user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    ));
  }
}