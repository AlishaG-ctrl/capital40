const express = require('express');
const router = express.Router();
const axios = require('axios');

// NOTE: Replace with your actual Yoco Secret Key in production
const YOCO_SECRET_KEY = process.env.YOCO_SECRET_KEY;

router.post('/yoco-payment', async (req, res) => {
  const { token, amountInCents, currency } = req.body;

  try {
    const response = await axios.post(
      'https://online.yoco.com/v1/charges/',
      {
        token,
        amountInCents,
        currency
      },
      {
        headers: {
          'X-Auth-Secret-Key': YOCO_SECRET_KEY
        }
      }
    );

    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error('Yoco error:', error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Yoco charge failed' });
  }
});

module.exports = router;
