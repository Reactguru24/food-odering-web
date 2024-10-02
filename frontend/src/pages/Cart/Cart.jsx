import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../components/context/StoreContext';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of navigate

function Cart() {
  const { cartItems, food_list, removeFromCart, getTotalAmount } = useContext(StoreContext);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const deliveryFee = 5.00; // Example static delivery fee
  const navigate = useNavigate(); // Hook to navigate between routes

  // Check if the cart is empty
  const isEmpty = !Object.values(cartItems).some((quantity) => quantity > 0);

  // Get the total items and amount
  const totalItems = food_list.reduce((sum, item) => {
    const quantity = cartItems[item._id] || 0;
    return sum + quantity;
  }, 0);

  const totalAmount = getTotalAmount(); // Using getTotalAmount from StoreContext

  const handlePromoCodeApply = () => {
    if (promoCode === 'DISCOUNT10') {
      setDiscount(0.1 * totalAmount); // 10% discount
    } else {
      setDiscount(0);
      alert('Invalid Promo Code');
    }
  };

  const finalAmount = totalAmount - discount + deliveryFee;

  return (
    <div className="cart">
      <div className="cart-items">
        {isEmpty ? (
          <div className="empty-cart-message">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-header">
              <h2>
                Cart Items: {totalItems} | Subtotal: ${totalAmount.toFixed(2)}
              </h2>
            </div>
            <div className="cart-items-title">
              <p>Item</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <hr />
            {food_list.map((item) => {
              const quantity = cartItems[item._id];
              if (quantity > 0) {
                const totalPrice = item.price * quantity;
                return (
                  <div className="cart-items-item" key={item._id}>
                    <img src={item.image} alt={item.name} className="cart-item-image" />
                    <p>{item.name}</p>
                    <p>${item.price.toFixed(2)}</p>
                    <p>{quantity}</p>
                    <p>${totalPrice.toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item._id)} className="remove-button">
                      Remove
                    </button>
                  </div>
                );
              }
              return null;
            })}

            {/* Promo Code Section */}
            <div className="promo-code">
              <input
                type="text"
                placeholder="Enter Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={handlePromoCodeApply}>Apply</button>
            </div>

            {/* Total and Checkout Section */}
            <div className="cart-total">
              <hr />
              <p>Subtotal: ${totalAmount.toFixed(2)}</p>
              <p>Delivery Fee: ${deliveryFee.toFixed(2)}</p>
              {discount > 0 && (
                <p>Discount: -${discount.toFixed(2)}</p>
              )}
              <h3>Total: ${finalAmount.toFixed(2)}</h3>
              <button onClick={() => navigate('/order')} className="checkout-button">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
