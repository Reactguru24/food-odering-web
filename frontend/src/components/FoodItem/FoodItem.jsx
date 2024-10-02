import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';

function FoodItem({ id, name, description, price, image }) {
  
  
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img src={image} alt="" className="food-item-image" />
        {
          !cartItems[id] ? (
            <img
              className="add"
              onClick={() => {
                console.log(id);
                
                addToCart(id)}}  // Correctly passing id inside an arrow function
              src={assets.add_icon_white}
              alt="Add"
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => removeFromCart(id)}  // Correctly passing id inside an arrow function
                src={assets.remove_icon_red}
                alt="Remove"
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() => addToCart(id)}  // Correctly passing id inside an arrow function
                src={assets.add_icon_green}
                alt="Add More"
              />
            </div>
          )
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">$. {price}</p>
      </div>
    </div>
  );
}

export default FoodItem;
