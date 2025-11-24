const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const db = require('../config/database');

// Create order
router.post('/', auth, [
  body('items').isArray({ min: 1 }).withMessage('Items must be an array with at least 1 item'),
  body('total_amount').isFloat({ min: 0 }).withMessage('Total amount must be positive'),
  body('shipping_address').isObject().withMessage('Shipping address is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { items, total_amount, shipping_address, payment_method } = req.body;
    const userId = req.user.userId;

    // Start transaction
    await db.query('BEGIN');

    // Insert order
    const orderResult = await db.query(
      'INSERT INTO orders (user_id, total_amount, shipping_address, payment_method, status) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [userId, total_amount, JSON.stringify(shipping_address), payment_method || 'credit_card', 'pending']
    );

    const orderId = orderResult.rows[0].id;

    // Insert order items
    for (const item of items) {
      await db.query(
        'INSERT INTO order_items (order_id, artwork_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [orderId, item.artwork_id, item.quantity, item.price]
      );
    }

    await db.query('COMMIT');

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: orderId,
        user_id: userId,
        total_amount,
        shipping_address,
        payment_method: payment_method || 'credit_card',
        status: 'pending',
        items
      }
    });
  } catch (error) {
    await db.query('ROLLBACK');
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user orders
router.get('/', auth, async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;
    const userId = req.user.userId;

    let query = `
      SELECT 
        o.id,
        o.total_amount,
        o.shipping_address,
        o.payment_method,
        o.status,
        o.created_at,
        o.updated_at
      FROM orders o
      WHERE o.user_id = $1
    `;
    const params = [userId];
    let paramCount = 1;

    if (status) {
      paramCount++;
      query += ` AND o.status = $${paramCount}`;
      params.push(status);
    }

    query += ` ORDER BY o.created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    params.push(parseInt(limit), parseInt(offset));

    const result = await db.query(query, params);

    // Get order items for each order
    for (const order of result.rows) {
      const itemsResult = await db.query(`
        SELECT 
          oi.id,
          oi.artwork_id,
          oi.quantity,
          oi.price,
          a.title,
          a.image_url
        FROM order_items oi
        JOIN artworks a ON oi.artwork_id = a.id
        WHERE oi.order_id = $1
      `, [order.id]);
      
      order.items = itemsResult.rows;
      order.shipping_address = order.shipping_address;
    }

    res.json(result.rows);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const orderResult = await db.query(`
      SELECT 
        o.id,
        o.user_id,
        o.total_amount,
        o.shipping_address,
        o.payment_method,
        o.status,
        o.created_at,
        o.updated_at
      FROM orders o
      WHERE o.id = $1 AND o.user_id = $2
    `, [id, userId]);

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const order = orderResult.rows[0];

    // Get order items
    const itemsResult = await db.query(`
      SELECT 
        oi.id,
        oi.artwork_id,
        oi.quantity,
        oi.price,
        a.title,
        a.image_url,
        a.description
      FROM order_items oi
      JOIN artworks a ON oi.artwork_id = a.id
      WHERE oi.order_id = $1
    `, [id]);

    order.items = itemsResult.rows;

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status
router.patch('/:id/status', auth, [
  body('status').isIn(['pending', 'processing', 'shipped', 'completed', 'cancelled']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.userId;

    // Check if order belongs to user
    const orderResult = await db.query('SELECT user_id FROM orders WHERE id = $1', [id]);
    
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (orderResult.rows[0].user_id !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this order' });
    }

    await db.query(
      'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [status, id]
    );

    res.json({
      message: 'Order status updated successfully',
      order: { id, status }
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;