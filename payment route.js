npm install paystack-node
const paystack = require('paystack-node')('your-paystack-secret-key');

// Route for initiating a payment
router.post('/pay', authenticate, async (req, res) => {
  const { amount } = req.body;
  
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).send('User not found');

  // Prepare the payment data
  const paymentData = {
    email: user.email,
    amount: amount * 100,  // Amount in kobo
    callback_url: 'http://your-site.com/payment/callback',
  };

  paystack.transaction.initialize(paymentData)
    .then(response => {
      // Save the transaction reference and redirect to Paystack payment page
      const paymentLink = response.data.authorization_url;
      res.status(200).json({ paymentLink });
    })
    .catch(err => {
      res.status(500).send('Payment initialization failed');
    });
});

// Callback route to verify payment
router.get('/payment/callback', (req, res) => {
  const ref = req.query.reference;

  paystack.transaction.verify(ref)
    .then(response => {
      if (response.data.status === 'success') {
        // Handle successful payment, update wallet balance
        res.status(200).send('Payment successful');
      } else {
        res.status(400).send('Payment failed');
      }
    })
    .catch(err => {
      res.status(500).send('Payment verification failed');
    });
});