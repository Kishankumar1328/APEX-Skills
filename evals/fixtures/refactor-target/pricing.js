
function calculateDiscounts(items, userType) {
  let total = 0;
  // Duplicated calculation logic to be refactored
  if (userType === 'VIP') {
    for (let i = 0; i < items.length; i++) {
      total += items[i].price * 0.8;
    }
  } else if (userType === 'MEMBER') {
    for (let i = 0; i < items.length; i++) {
      total += items[i].price * 0.9;
    }
  } else {
    for (let i = 0; i < items.length; i++) {
      total += items[i].price * 1.0;
    }
  }
  return total;
}
module.exports = { calculateDiscounts };
