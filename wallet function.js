// Add money to wallet
const addToWallet = async (userId, amount) => {
  try {
    const user = await User.findById(userId);
    if (!user) return { status: 'error', message: 'User not found' };

    user.walletBalance += amount;
    await user.save();
    return { status: 'success', message: 'Wallet updated successfully' };
  } catch (err) {
    return { status: 'error', message: 'Server error' };
  }
};

// Deduct money from wallet (for paying for tasks)
const deductFromWallet = async (userId, amount) => {
  try {
    const user = await User.findById(userId);
    if (!user) return { status: 'error', message: 'User not found' };

    if (user.walletBalance < amount) {
      return { status: 'error', message: 'Insufficient balance' };
    }

    user.walletBalance -= amount;
    await user.save();
    return { status: 'success', message: 'Wallet updated successfully' };
  } catch (err) {
    return { status: 'error', message: 'Server error' };
  }
};