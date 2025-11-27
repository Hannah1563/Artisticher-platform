const express = require('express');
const axios = require('axios');
const QRCode = require('qrcode');
const router = express.Router();

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;

router.post('/pay', async (req, res) => {
  console.log('FLW_SECRET_KEY:', FLW_SECRET_KEY);
  console.log('Payment payload:', req.body);
  const { amount, phone, description, email, currency = 'RWF' } = req.body;

  try {
    // 1. Create a payment link with Flutterwave
    const flwRes = await axios.post(
      'https://api.flutterwave.com/v3/payments',
      {
        tx_ref: `ART-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        amount,
        currency,
        redirect_url: 'https://your-frontend-url.com/payment-success', // Update to your frontend
        payment_options: 'mobilemoneyrwanda,card',
        customer: {
          email,
          phonenumber: phone,
          name: description || 'Artisticher User'
        },
        customizations: {
          title: 'Artisticher Payment',
          description: description || 'Payment for artwork'
        }
      },
      {
        headers: {
          Authorization: `Bearer ${FLW_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const paymentLink = flwRes.data.data.link;

    // 2. Generate QR code for the payment link
    const qrDataUrl = await QRCode.toDataURL(paymentLink);

    // 3. Return QR code and payment link to frontend
    res.json({
      success: true,
      paymentLink,
      qrDataUrl
    });
  } catch (err) {
    console.error('Flutterwave payment initiation failed:', err.response?.data || err.message);
    res.status(500).json({ success: false, error: 'Payment initiation failed' });
  }
});

router.get('/momo-qr', async (req, res) => {
  const { phone } = req.query;
  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }
  // For demo: generate a static QR code for the phone number
  try {
    const qrDataUrl = await QRCode.toDataURL(phone);
    res.json({ qrDataUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
});

module.exports = router;