import React, { useState } from 'react';
import { createOrder } from '../api';
import QRCode from 'qrcode.react';

function PaymentModal({ artwork, onClose, onSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('mtn_momo');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentLink, setPaymentLink] = useState(null);

  const handlePayment = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const orderData = {
        artwork_id: artwork.id,
        payment_method: paymentMethod,
        ...((paymentMethod === 'mtn_momo' || paymentMethod === 'airtel_money') && { 
          phone_number: phoneNumber 
        })
      };

      const response = await createOrder(orderData);
      
      // Show payment link with QR code
      setPaymentLink(response.order.payment_link);
      
      if (onSuccess) onSuccess(response.order);
    } catch (err) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  // Show QR code and payment link
  if (paymentLink) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">
            Complete Your Payment
          </h2>

          <div className="text-center mb-6">
            <p className="text-gray-600 mb-4">
              Scan this QR code with your phone
            </p>
            
            {/* QR Code */}
            <div className="flex justify-center mb-4 bg-white p-4 rounded-lg">
              <QRCode value={paymentLink} size={200} level="H" />
            </div>

            <p className="text-sm text-gray-500 mb-4">Or click the button below</p>

            {/* Payment Link Button */}
            <a
              href={paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 font-semibold"
            >
              Pay {artwork.price} RWF
            </a>
          </div>

          <div className="bg-green-50 border border-green-200 rounded p-3 mb-4">
            <p className="text-sm text-green-800 flex items-center gap-2">
              <span>🔒</span>
              <span>Secure payment powered by Flutterwave</span>
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-4">
            <p className="text-xs text-yellow-800">
              ⏱️ Complete payment within 15 minutes
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Payment form
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Complete Purchase</h2>
        
        <div className="bg-purple-50 p-4 rounded-lg mb-6">
          <p className="font-semibold text-gray-800">{artwork.title}</p>
          <p className="text-2xl font-bold text-purple-600">{artwork.price} RWF</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
            >
              <option value="mtn_momo">📱 MTN Mobile Money</option>
              <option value="airtel_money">📱 Airtel Money</option>
              <option value="bank_card">💳 Bank Card (Visa/Mastercard)</option>
            </select>
          </div>

          {(paymentMethod === 'mtn_momo' || paymentMethod === 'airtel_money') && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="078XXXXXXX"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
              />
              <p className="text-xs text-gray-500 mt-1">
                🔒 Encrypted and secure
              </p>
            </div>
          )}

          <div className="bg-green-50 border border-green-200 rounded p-3 mb-4">
            <p className="text-xs text-green-800">
              ✅ PCI-DSS compliant • SSL encrypted • Verified by Flutterwave
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 font-semibold"
            >
              {loading ? 'Processing...' : 'Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentModal;