import React, { useState, useEffect } from 'react';
import { getUserOrders } from '../api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getUserOrders();
      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="orders-container">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>📦 No orders yet</p>
          <p>Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              {order.image_url && (
                <img src={order.image_url} alt={order.title} />
              )}
              <div className="order-info">
                <h3>{order.title}</h3>
                <p className="artist">Artist: {order.artist_name}</p>
                <p className="price">{parseFloat(order.total_amount).toLocaleString()} RWF</p>
                <div className="order-meta">
                  <span className={`status status-${order.payment_status}`}>
                    {order.payment_status || 'pending'}
                  </span>
                  <span className="date">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="payment-method">
                  Payment: {order.payment_method === 'mtn_momo' ? 'MTN Mobile Money' : 'Bank Card'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;