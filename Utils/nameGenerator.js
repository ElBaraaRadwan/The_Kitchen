module.exports = function generateUsername(profile) {
    var username = '';

    if (profile.emails) {
      username = profile.emails[0].value.split('@')[0];
    } else if (profile.name) {
      username = profile.name.givenName[0] + profile.name.familyName;
    }

    return username.toLowerCase() || undefined;
  }