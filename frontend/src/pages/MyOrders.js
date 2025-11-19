import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function MyOrders({ user }) {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load orders from localStorage (will be from backend later)
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = savedOrders.filter(order => order.userId === user.userId);
    setOrders(userOrders.reverse()); // Show newest first
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-3xl font-bold mb-4">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
          <Link 
            to="/gallery" 
            className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 inline-block"
          >
            Browse Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">My Orders ({orders.length})</h1>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">Order #{index + 1}</h3>
                <p className="text-gray-600">
                  Placed on {new Date(order.orderDate).toLocaleDateString()} at {new Date(order.orderDate).toLocaleTimeString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">
                  ${parseFloat(order.total).toFixed(2)}
                </p>
                <span className="inline-block mt-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  Completed
                </span>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">Shipping Address:</h4>
              <p className="text-gray-700">
                {order.shippingInfo.fullName}<br />
                {order.shippingInfo.address}<br />
                {order.shippingInfo.city}, {order.shippingInfo.zipCode}<br />
                {order.shippingInfo.country}
              </p>
            </div>

            {/* Order Items */}
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-3">Items:</h4>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img 
                      src={item.image_url?.startsWith('http') ? item.image_url : `http://localhost:5001${item.image_url}`}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-600 text-sm">by {item.username}</p>
                      <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;