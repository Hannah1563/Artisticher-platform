const Flutterwave = require('flutterwave-node-v3');

const flw = new Flutterwave(
  process.env.FLUTTERWAVE_PUBLIC_KEY,
  process.env.FLUTTERWAVE_SECRET_KEY
);

class PaymentService {
  // Create payment link with QR code support
  async createPaymentLink(orderData) {
    try {
      const payload = {
        tx_ref: orderData.payment_reference,
        amount: orderData.amount,
        currency: "RWF",
        redirect_url: `${process.env.FRONTEND_URL}/payment/callback`,
        customer: {
          email: orderData.email,
          phonenumber: orderData.phone_number,
          name: orderData.customer_name
        },
        customizations: {
          title: "Artisticher",
          description: orderData.artwork_title,
          logo: "https://your-logo-url.com/logo.png"
        },
        payment_options: "mobilemoneyrwanda,card",
        meta: {
          order_id: orderData.order_id,
          artwork_id: orderData.artwork_id
        }
      };

      const response = await flw.PaymentLink.create(payload);
      
      if (response.status === 'success') {
        return {
          success: true,
          link: response.data.link,
          reference: orderData.payment_reference
        };
      }
      
      throw new Error('Failed to create payment link');
    } catch (error) {
      console.error('Payment link creation error:', error);
      throw error;
    }
  }

  // Verify payment after completion
  async verifyPayment(transactionId) {
    try {
      const response = await flw.Transaction.verify({ id: transactionId });
      
      if (
        response.data.status === "successful" && 
        response.data.amount >= response.data.charged_amount &&
        response.data.currency === "RWF"
      ) {
        return {
          success: true,
          data: response.data
        };
      }
      
      return {
        success: false,
        message: 'Payment verification failed'
      };
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  }

  // Process refund (if needed)
  async processRefund(transactionId) {
    try {
      const payload = {
        id: transactionId
      };

      const response = await flw.Transaction.refund(payload);
      return response;
    } catch (error) {
      console.error('Refund error:', error);
      throw error;
    }
  }
}

module.exports = new PaymentService();