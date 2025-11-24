const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

// All order routes require authentication
router.use(authMiddleware);

// POST /api/orders - create order
router.post('/', orderController.createOrder);

// GET /api/orders - get user orders
router.get('/', orderController.getUserOrders);

// GET /api/orders/:id - get specific order
router.get('/:id', orderController.getOrderById);

module.exports = router;