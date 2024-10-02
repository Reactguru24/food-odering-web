import React, { useContext, useState } from 'react';
import { StoreContext } from '../../components/context/StoreContext';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css'; // Add your custom CSS here

function PlaceOrder() {
  const { cartItems, food_list, getTotalAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [distance, setDistance] = useState('');

  const totalAmount = getTotalAmount();
  const baseFee = 3.00; // Base fee
  const feePerKm = 0.50; // Fee per kilometer

  const calculateDeliveryFee = (distance) => {
    const distanceInKm = parseFloat(distance) || 0;
    return baseFee + (distanceInKm * feePerKm);
  };

  const deliveryFee = calculateDeliveryFee(distance);
  const finalAmount = totalAmount + deliveryFee;

  const handlePlaceOrder = () => {
    // Logic for placing the order
    alert('Order has been placed successfully, proceed to payment');
    navigate('/payment'); // Redirect to payment page
  };

  // Check if all fields are filled
  const isFormValid = Object.values(shippingDetails).every((value) => value.trim() !== '') && distance.trim() !== '';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  return (
    <div className="placeorder-container">
      <h2>Order Summary</h2>
      <div className="order-details">
        {food_list.map((item) => {
          const quantity = cartItems[item._id];
          if (quantity > 0) {
            const totalPrice = item.price * quantity;
            return (
              <div key={item._id} className="order-item">
                <p>{item.name} x {quantity}</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
            );
          }
          return null;
        })}
        <hr />
        <p>Subtotal: ${totalAmount.toFixed(2)}</p>
        <p>Delivery Fee: ${deliveryFee.toFixed(2)}</p>
        <h3>Total: ${finalAmount.toFixed(2)}</h3>
      </div>

      {/* Shipping Details Form */}
      <div className="shipping-details">
        <h3>Shipping Details</h3>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={shippingDetails.fullName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingDetails.address}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingDetails.city}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={shippingDetails.postalCode}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="distance"
          placeholder="Enter delivery distance (in km)"
          value={distance}
          onChange={handleDistanceChange}
        />
      </div>

      {/* Place Order Button */}
      <button
        className="placeorder-button"
        onClick={handlePlaceOrder}
        disabled={!isFormValid} // Disable button if form is not valid
      >
        Proceed to payment
      </button>
    </div>
  );
}

export default PlaceOrder;
