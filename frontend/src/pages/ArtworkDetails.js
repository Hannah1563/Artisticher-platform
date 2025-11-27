import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArtworkById } from '../api';

function ArtworkDetails() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showPurchase, setShowPurchase] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [step, setStep] = useState(1);
  const [paymentCode, setPaymentCode] = useState('');
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [paymentLink, setPaymentLink] = useState('');

  useEffect(() => {
    getArtworkById(id)
      .then(res => {
        console.log('Artwork details API response:', res.data);
        setArtwork(res.data.artwork || res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handlePurchase = () => {
    setShowPurchase(true);
    setStep(1);
    setPaymentMethod('');
    setPaymentCode('');
    setPurchaseSuccess(false);
  };

  const handlePayment = () => {
    // Here you would integrate with real payment APIs
    setStep(3);
    setPurchaseSuccess(true);
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: 80, fontSize: 22, color: '#a259cf' }}>Loading artwork details...</div>;
  if (!artwork) return <div style={{ textAlign: 'center', marginTop: 80, fontSize: 22, color: '#c00' }}>Artwork not found.</div>;

  return (
    <div style={{
      maxWidth: 500,
      margin: '48px auto',
      background: '#fff',
      borderRadius: 18,
      boxShadow: '0 6px 32px rgba(160,89,207,0.12), 0 2px 8px #eee',
      padding: 32,
      textAlign: 'center'
    }}>
      <img
        src={artwork.image_url.startsWith('http') ? artwork.image_url : `http://localhost:5001${artwork.image_url}`}
        alt={artwork.title}
        style={{
          width: '100%',
          height: 320,
          objectFit: 'cover',
          borderRadius: 12,
          marginBottom: 24,
          background: '#eee'
        }}
      />
      <h2 style={{ fontSize: 28, color: '#222', marginBottom: 12 }}>{artwork.title}</h2>
      <div style={{ color: '#a259cf', fontWeight: 600, fontSize: 18, marginBottom: 10 }}>
        Price: {artwork.price} RWF
      </div>
      <div style={{ color: '#555', fontSize: 16, marginBottom: 16 }}>{artwork.description}</div>
      <div style={{ color: '#888', fontSize: 15, marginBottom: 24 }}>
        Artist: {artwork.artist_name || artwork.artist?.username || 'Unknown'}
      </div>
      <button
        style={{
          background: 'linear-gradient(90deg,#a259cf 60%,#6e56cf 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 32px',
          fontWeight: 700,
          fontSize: 16,
          cursor: 'pointer',
          marginRight: 16
        }}
        onClick={() => navigate('/gallery')}
      >
        ← Back to Gallery
      </button>
      <button
        style={{
          background: '#fff',
          color: '#a259cf',
          border: '2px solid #a259cf',
          borderRadius: 8,
          padding: '10px 32px',
          fontWeight: 700,
          fontSize: 16,
          cursor: 'pointer'
        }}
        onClick={handlePurchase}
      >
        Buy Artwork
      </button>
      {showPurchase && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: '#fff', borderRadius: 16, padding: 32, minWidth: 340, maxWidth: 400, boxShadow: '0 4px 24px #a259cf22', position: 'relative'
          }}>
            {step === 1 && (
              <>
                <h3 style={{marginBottom: 18}}>Choose Payment Method</h3>
                <button
                  style={{marginBottom: 12, width: '100%', padding: 12, borderRadius: 8, border: '1px solid #a259cf', background: paymentMethod === 'momo' ? '#f3eaff' : '#fff', fontWeight: 600, color: '#a259cf', cursor: 'pointer'}}
                  onClick={() => setPaymentMethod('momo')}
                >MTN MoMo Pay</button>
                <button
                  style={{marginBottom: 18, width: '100%', padding: 12, borderRadius: 8, border: '1px solid #a259cf', background: paymentMethod === 'card' ? '#f3eaff' : '#fff', fontWeight: 600, color: '#a259cf', cursor: 'pointer'}}
                  onClick={() => setPaymentMethod('card')}
                >Bank Card</button>
                <button
                  style={{width: '100%', padding: 10, borderRadius: 8, background: '#a259cf', color: '#fff', fontWeight: 700, border: 'none', marginTop: 8, cursor: paymentMethod ? 'pointer' : 'not-allowed'}}
                  disabled={!paymentMethod}
                  onClick={() => setStep(2)}
                >Continue</button>
              </>
            )}
            {step === 2 && paymentMethod === 'momo' && (
              <>
                <h3 style={{marginBottom: 18}}>MoMo Pay</h3>
                <input
                  type="tel"
                  placeholder="+2507XXXXXXXX"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                  style={{width: '100%', padding: 10, borderRadius: 8, border: '1px solid #a259cf', marginBottom: 16}}
                  pattern="^\+2507\d{8}$"
                  maxLength={13}
                />
                <div style={{fontSize: 13, color: '#888', marginBottom: 8}}>
                  Enter your Rwanda MTN number (format: +2507XXXXXXXX)
                </div>
                <button
                  style={{width: '100%', padding: 10, borderRadius: 8, background: '#a259cf', color: '#fff', fontWeight: 700, border: 'none'}}
                  disabled={!phoneNumber}
                  onClick={async () => {
                    try {
                      // Get user email from localStorage if available
                      const user = JSON.parse(localStorage.getItem('user') || '{}');
                      const res = await fetch('http://localhost:5001/api/payments/pay', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          phone: phoneNumber,
                          amount: artwork.price,
                          email: user.email || 'user@example.com', // Use logged-in user's email if available
                          description: `Purchase of ${artwork.title}`
                        })
                      });
                      const data = await res.json();
                      if (data.qrDataUrl) {
                        setQrDataUrl(data.qrDataUrl);
                        setStep(3);
                      } else {
                        alert('Failed to get QR code.');
                      }
                    } catch (err) {
                      alert('Failed to get QR code.');
                    }
                  }}
                >
                  Continue
                </button>
              </>
            )}
            {step === 3 && paymentMethod === 'momo' && (
              <>
                <h3 style={{marginBottom: 18}}>MoMo Pay Confirmation</h3>
                <div style={{marginBottom: 16}}>Scan this QR code with your phone to complete your payment.</div>
                <div style={{marginBottom: 16, textAlign: 'center'}}>
                  {qrDataUrl && <img src={qrDataUrl} alt="MoMo QR" style={{marginBottom: 12}} />}
                </div>
                {/* Removed input and Pay Now button */}
              </>
            )}
            {step === 2 && paymentMethod === 'card' && (
              <>
                <h3 style={{marginBottom: 18}}>Bank Card Payment</h3>
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  style={{width: '100%', padding: 10, borderRadius: 8, border: '1px solid #a259cf', marginBottom: 10}}
                />
                <input
                  type="text"
                  placeholder="Expiry (MM/YY)"
                  value={expiry}
                  onChange={e => setExpiry(e.target.value)}
                  style={{width: '100%', padding: 10, borderRadius: 8, border: '1px solid #a259cf', marginBottom: 10}}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={e => setCvv(e.target.value)}
                  style={{width: '100%', padding: 10, borderRadius: 8, border: '1px solid #a259cf', marginBottom: 16}}
                />
                <button
                  style={{width: '100%', padding: 10, borderRadius: 8, background: '#a259cf', color: '#fff', fontWeight: 700, border: 'none'}}
                  disabled={!cardNumber || !expiry || !cvv}
                  onClick={async () => {
                    try {
                      const user = JSON.parse(localStorage.getItem('user') || '{}');
                      const res = await fetch('http://localhost:5001/api/payments/pay', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          amount: artwork.price,
                          email: user.email || 'user@example.com', // Use logged-in user's email if available
                          description: `Purchase of ${artwork.title} by card`
                        })
                      });
                      const data = await res.json();
                      if (data.qrDataUrl) {
                        setQrDataUrl(data.qrDataUrl);
                        setPaymentLink(data.paymentLink); // Save payment link if provided
                        setStep(3);
                      } else {
                        alert('Failed to get QR code.');
                      }
                    } catch (err) {
                      alert('Failed to get QR code.');
                    }
                  }}
                >
                  Continue
                </button>
              </>
            )}
            {step === 3 && paymentMethod === 'card' && (
              <>
                <h3 style={{marginBottom: 18}}>Bank Card Confirmation</h3>
                <div style={{marginBottom: 16}}>Scan this QR code with your bank app or click the payment link below to complete your payment.</div>
                <div style={{marginBottom: 16, textAlign: 'center'}}>
                  {qrDataUrl && <img src={qrDataUrl} alt="Bank QR" style={{marginBottom: 12}} />}
                </div>
                {paymentLink && (
                  <a href={paymentLink} target="_blank" rel="noopener noreferrer" style={{display: 'block', marginBottom: 16, color: '#a259cf', fontWeight: 600}}>
                    Open Payment Page
                  </a>
                )}
                {/* Removed input and Pay Now button */}
              </>
            )}
            {step === 3 && purchaseSuccess && (
              <>
                <h3 style={{marginBottom: 18, color: '#2ecc40'}}>Payment Successful!</h3>
                <div style={{marginBottom: 16}}>Thank you for your purchase. You will be contacted for delivery.</div>
                <button
                  style={{width: '100%', padding: 10, borderRadius: 8, background: '#a259cf', color: '#fff', fontWeight: 700, border: 'none'}}
                  onClick={() => setShowPurchase(false)}
                >Close</button>
              </>
            )}
            <button
              style={{position: 'absolute', top: 12, right: 18, background: 'none', border: 'none', fontSize: 22, color: '#a259cf', cursor: 'pointer'}}
              onClick={() => setShowPurchase(false)}
              aria-label="Close"
            >×</button>
          </div>
        </div>
      )}
      {purchaseSuccess && (
        <div style={{
          maxWidth: 400,
          margin: '32px auto',
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 6px 32px rgba(160,89,207,0.12), 0 2px 8px #eee',
          padding: 24,
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: 24, color: '#222', marginBottom: 12 }}>Purchase Successful!</h3>
          <div style={{ color: '#a259cf', fontWeight: 600, fontSize: 18, marginBottom: 10 }}>
            Thank you for your purchase!
          </div>
          <button
            style={{
              background: 'linear-gradient(90deg,#a259cf 60%,#6e56cf 100%)',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 32px',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
              marginRight: 16
            }}
            onClick={() => navigate('/gallery')}
          >
            ← Back to Gallery
          </button>
          <button
            style={{
              background: '#fff',
              color: '#a259cf',
              border: '2px solid #a259cf',
              borderRadius: 8,
              padding: '10px 32px',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer'
            }}
            onClick={() => setPurchaseSuccess(false)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default ArtworkDetails;