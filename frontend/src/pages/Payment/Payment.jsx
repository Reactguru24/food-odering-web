import React, { useState } from 'react';
import './Payment.css';
import { useNavigate } from 'react-router-dom';
import mpesaLogo from '../../assets/mpesa_logo.png';   // Example logos
import paypalLogo from '../../assets/paypal_logo.png';
import creditCardLogo from '../../assets/creditcard_logo.png';
import airtelMoneyLogo from '../../assets/airtelmoney_logo.png';

function Payment() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [creditCardDetails, setCreditCardDetails] = useState('');
  const [airtelPhone, setAirtelPhone] = useState('');
  const navigate = useNavigate();

  const handlePaymentSubmit = () => {
    if (selectedMethod) {
      alert(`You have selected ${selectedMethod}. Proceeding to payment...`);
      navigate('/confirmation'); // Redirect to confirmation page after payment
    }
  };

  // Check if required fields are filled
  const isFormValid = () => {
    switch (selectedMethod) {
      case 'Mpesa':
        return mpesaPhone.trim() !== '';
      case 'PayPal':
        return paypalEmail.trim() !== '';
      case 'Credit Card':
        return creditCardDetails.trim() !== '';
      case 'Airtel Money':
        return airtelPhone.trim() !== '';
      default:
        return false;
    }
  };

  return (
    <div className="payment-container">
      <h2>Select Payment Method</h2>
      <div className="payment-options">

        {/* Mpesa Payment Option */}
        <label className="payment-option">
          <div className="payment-info">
            <img src={mpesaLogo} alt="Mpesa" className="payment-logo" />
            <span className="payment-title">Mpesa</span>
          </div>
          <input
            type="radio"
            name="paymentMethod"
            value="Mpesa"
            checked={selectedMethod === 'Mpesa'}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          {selectedMethod === 'Mpesa' && (
            <div className="payment-details">
              <p>Pay via Mpesa mobile payment.</p>
              <input
                type="text"
                placeholder="Enter phone number"
                value={mpesaPhone}
                onChange={(e) => setMpesaPhone(e.target.value)}
                className="payment-input"
              />
            </div>
          )}
        </label>

        {/* PayPal Payment Option */}
        <label className="payment-option">
          <div className="payment-info">
            <img src={paypalLogo} alt="PayPal" className="payment-logo" />
            <span className="payment-title">PayPal</span>
          </div>
          <input
            type="radio"
            name="paymentMethod"
            value="PayPal"
            checked={selectedMethod === 'PayPal'}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          {selectedMethod === 'PayPal' && (
            <div className="payment-details">
              <p>Pay securely with PayPal.</p>
              <input
                type="email"
                placeholder="Enter PayPal email"
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                className="payment-input"
              />
            </div>
          )}
        </label>

        {/* Credit Card Payment Option */}
        <label className="payment-option">
          <div className="payment-info">
            <img src={creditCardLogo} alt="Credit Card" className="payment-logo" />
            <span className="payment-title">Credit Card</span>
          </div>
          <input
            type="radio"
            name="paymentMethod"
            value="Credit Card"
            checked={selectedMethod === 'Credit Card'}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          {selectedMethod === 'Credit Card' && (
            <div className="payment-details">
              <p>Pay using any major credit card.</p>
              <input
                type="text"
                placeholder="Enter card details"
                value={creditCardDetails}
                onChange={(e) => setCreditCardDetails(e.target.value)}
                className="payment-input"
              />
            </div>
          )}
        </label>

        {/* Airtel Money Payment Option */}
        <label className="payment-option">
          <div className="payment-info">
            <img src={airtelMoneyLogo} alt="Airtel Money" className="payment-logo" />
            <span className="payment-title">Airtel Money</span>
          </div>
          <input
            type="radio"
            name="paymentMethod"
            value="Airtel Money"
            checked={selectedMethod === 'Airtel Money'}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          {selectedMethod === 'Airtel Money' && (
            <div className="payment-details">
              <p>Pay using Airtel Money mobile payment.</p>
              <input
                type="text"
                placeholder="Enter phone number"
                value={airtelPhone}
                onChange={(e) => setAirtelPhone(e.target.value)}
                className="payment-input"
              />
            </div>
          )}
        </label>
      </div>

      <button
        className="payment-submit-button"
        onClick={handlePaymentSubmit}
        disabled={!isFormValid()}
      >
        Proceed to Payment
      </button>
    </div>
  );
}

export default Payment;
