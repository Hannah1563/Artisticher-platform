import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api';

const Checkout = ({ cart = [], user, clearCart }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });
  const [loading, setLoading] = useState(false);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + parseFloat(item.price) * (item.quantity || 1);
    }, 0);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckout = async (shippingInfo) => {
    try {
      const orderData = {
        items: cart.map((item) => ({
          artwork_id: item.id,
          quantity: item.quantity || 1,
          price: item.price,
        })),
        total_amount: calculateTotal(),
        shipping_address: shippingInfo,
      };

      const response = await createOrder(orderData);
      console.log('Order created:', response.data);

      // Save order to localStorage as a simple history (optional)
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(response.data.order || response.data);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      if (clearCart) clearCart();
      setLoading(false);
      alert('Order placed successfully!');
      navigate('/my-orders');
    } catch (error) {
      console.error('Order failed:', error);
      setLoading(false);
      alert('Failed to place order. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please login to complete your purchase');
      navigate('/login');
      return;
    }

    setLoading(true);
    handleCheckout(formData);
  };

  // Guard: empty cart
  if (!cart || cart.length === 0) {
    navigate('/cart');
    return null;
  }

  // Guard: not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p className="mb-6">Total: ${calculateTotal().toFixed(2)}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Address</label>
          <input
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">City</label>
          <input
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Country</label>
          <input
            name="country"
            type="text"
            value={formData.country}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block mb-1">Postal Code</label>
          <input
            name="postalCode"
            type="text"
            value={formData.postalCode}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? 'Placing order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;