
function handleProfileRequest(headers, body) {
  if (!headers || !headers['authorization']) {
    return { status: 401, body: { error: "Missing authorization token" } };
  }
  if (!body || !body.userId) {
    return { status: 400, body: { error: "userId is required" } };
  }
  return { status: 200, body: { userId: body.userId, role: "user" } };
}
module.exports = { handleProfileRequest };
