import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    const verifyPayment = async () => {
      const txRef = searchParams.get('tx_ref');
      const transactionId = searchParams.get('transaction_id');
      const paymentStatus = searchParams.get('status');

      if (paymentStatus === 'successful' && transactionId && txRef) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(
            `http://localhost:5001/api/orders/verify?transaction_id=${transactionId}&tx_ref=${txRef}`,
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          );

          const data = await response.json();

          if (data.status === 'successful') {
            setStatus('success');
            setMessage('Payment successful! Thank you for your purchase.');
            
            // Clear cart on successful payment
            localStorage.removeItem('cart');
            
            setTimeout(() => navigate('/my-orders'), 3000);
          } else {
            setStatus('failed');
            setMessage('Payment verification failed.');
          }
        } catch (error) {
          setStatus('failed');
          setMessage('Error verifying payment.');
        }
      } else {
        setStatus('failed');
        setMessage('Payment was not completed.');
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        {status === 'verifying' && (
          <>
            <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-purple-600 mx-auto mb-6"></div>
            <h2 className="text-2xl font-bold mb-3">Verifying Payment</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-7xl mb-6">✅</div>
            <h2 className="text-3xl font-bold text-green-600 mb-3">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
              <span>Redirecting to your orders...</span>
            </div>
          </>
        )}

        {status === 'failed' && (
          <>
            <div className="text-7xl mb-6">❌</div>
            <h2 className="text-3xl font-bold text-red-600 mb-3">Payment Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 font-semibold"
            >
              Return to Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default PaymentCallback;