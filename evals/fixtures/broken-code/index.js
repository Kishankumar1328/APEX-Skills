
function parseUserData(raw) {
  // Bug: fails when raw is null or missing profile
  const profile = raw.profile;
  return profile.name.toUpperCase();
}
module.exports = { parseUserData };
