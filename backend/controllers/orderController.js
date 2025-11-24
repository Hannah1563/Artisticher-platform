const db = require('../config/db');

// Create order with payment
exports.createOrder = async (req, res) => {
  try {
    const { artwork_id, payment_method, phone_number } = req.body;
    const userId = req.user.userId;

    console.log('📦 Creating order:', { artwork_id, payment_method, phone_number, userId });

    // Get artwork details
    const artworkResult = await db.query(
      `SELECT a.*, u.username as artist_name, u.email as artist_email
       FROM artworks a
       JOIN users u ON a.user_id = u.id
       WHERE a.id = $1`,
      [artwork_id]
    );

    if (artworkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Artwork not found' });
    }

    const artwork = artworkResult.rows[0];
    
    // Validate price (max 50,000 RWF)
    if (parseFloat(artwork.price) > 50000) {
      return res.status(400).json({ error: 'Price exceeds maximum limit of 50,000 RWF' });
    }

    const totalAmount = parseFloat(artwork.price);

    // Validate phone number for mobile money
    if (payment_method === 'mtn_momo' && !/^07[2389]\d{7}$/.test(phone_number)) {
      return res.status(400).json({ error: 'Invalid Rwandan phone number format' });
    }

    // Generate unique transaction reference
    const tx_ref = `ART-${Date.now()}-${artwork_id}`;

    // Create order in database
    const orderResult = await db.query(
      `INSERT INTO orders (
        user_id, artwork_id, total_amount, payment_method, 
        phone_number, payment_status, transaction_reference
      ) 
       VALUES ($1, $2, $3, $4, $5, 'pending', $6) 
       RETURNING *`,
      [userId, artwork_id, totalAmount, payment_method, phone_number, tx_ref]
    );

    const order = orderResult.rows[0];
    console.log('✅ Order created:', order.id);

    // Create payment link (for QR code)
    const paymentLink = `https://checkout.flutterwave.com/v3/hosted/pay/${tx_ref}`;

    // Update order with payment link
    await db.query(
      'UPDATE orders SET payment_link = $1 WHERE id = $2',
      [paymentLink, order.id]
    );

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: {
        id: order.id,
        amount: totalAmount,
        payment_link: paymentLink,
        qr_code: paymentLink,
        transaction_reference: tx_ref
      },
      artwork: {
        title: artwork.title,
        image_url: artwork.image_url,
        price: artwork.price,
        artist: artwork.artist_name
      }
    });
  } catch (error) {
    console.error('❌ Order creation error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await db.query(`
      SELECT 
        o.id,
        o.total_amount,
        o.payment_status,
        o.payment_method,
        o.created_at,
        o.transaction_reference,
        a.title,
        a.image_url,
        a.price,
        u.username as artist_name
      FROM orders o
      LEFT JOIN artworks a ON o.artwork_id = a.id
      LEFT JOIN users u ON a.user_id = u.id
      WHERE o.user_id = $1
      ORDER BY o.created_at DESC
    `, [userId]);

    res.json({ 
      success: true,
      orders: result.rows 
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get specific order
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const result = await db.query(
      `SELECT o.*, a.title, a.image_url, a.price, u.username as artist_name
       FROM orders o
       JOIN artworks a ON o.artwork_id = a.id
       JOIN users u ON a.user_id = u.id
       WHERE o.id = $1 AND o.user_id = $2`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ 
      success: true,
      order: result.rows[0] 
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Verify payment
exports.verifyPayment = async (req, res) => {
  try {
    const { transaction_id, tx_ref } = req.query;
    console.log('🔍 Verifying payment:', { transaction_id, tx_ref });

    await db.query(
      `UPDATE orders 
       SET payment_status = 'paid', status = 'completed' 
       WHERE transaction_reference = $1`,
      [tx_ref]
    );

    res.json({ 
      success: true,
      status: 'success',
      message: 'Payment verified successfully'
    });
  } catch (error) {
    console.error('❌ Payment verification error:', error);
    res.status(500).json({ error: 'Payment verification failed' });
  }
};

// Webhook handler
exports.handleWebhook = async (req, res) => {
  try {
    const payload = req.body;
    console.log('🔔 Webhook received:', payload);

    if (payload.event === 'charge.completed' && payload.data.status === 'successful') {
      const tx_ref = payload.data.tx_ref;

      await db.query(
        `UPDATE orders 
         SET payment_status = 'paid', status = 'completed' 
         WHERE transaction_reference = $1`,
        [tx_ref]
      );

      console.log('✅ Order updated via webhook:', tx_ref);
    }

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('❌ Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
};