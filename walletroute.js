// Add funds to wallet
router.post('/add-funds', authenticate, async (req, res) => {
  const { amount } = req.body;
  
  if (!amount || amount <= 0) return res.status(400).send('Invalid amount');

  const result = await addToWallet(req.user.id, amount);
  if (result.status === 'error') {
    return res.status(500).send(result.message);
  }
  res.status(200).send('Funds added to wallet');
});

// Check wallet balance
router.get('/wallet-balance', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send('User not found');
    res.status(200).json({ walletBalance: user.walletBalance });
  } catch (err) {
    res.status(500).send('Server error');
  }
});