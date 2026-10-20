
// Vulnerability 1: Hardcoded secret key
const JWT_SECRET = "super-secret-jwt-key-123456789";

function executeDynamicExpression(userInput) {
  // Vulnerability 2: Dangerous eval execution
  return eval(userInput);
}

module.exports = { JWT_SECRET, executeDynamicExpression };
