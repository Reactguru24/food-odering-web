import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../components/context/StoreContext';
import LoginSignup from '../LoginSignup/LoginSignup';

function Navbar() {
  const [menu, setMenu] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { cartItems } = useContext(StoreContext); // Get cartItems from context

  // Calculate the total number of products in the cart
  const totalItemsInCart = Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className='navbar'>
      <Link to={'/'}><img src={assets.logo} alt="logo" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to={'/'} onClick={() => setMenu('home')} className={menu === 'home' ? 'active' : ''}>Home</Link>
        <a href='#explore-menu' onClick={() => setMenu('menu')} className={menu === 'menu' ? 'active' : ''}>Menu</a>
        <a href='#app-download' onClick={() => setMenu('mobile-app')} className={menu === 'mobile-app' ? 'active' : ''}>Mobile App</a>
        <a href='#footer' onClick={() => setMenu('contact-us')} className={menu === 'contact-us' ? 'active' : ''}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img className="navbar-search-icon" src={assets.search_icon} alt="search" />
        <div className="navbar-cart-icon">
          <Link to={'/cart'}>
            <img src={assets.basket_icon} alt="basket" />
            {/* Show total number of products in the cart */}
            {totalItemsInCart > 0 && <div className="cart-badge">{totalItemsInCart}</div>}
          </Link>
        </div>
        <button onClick={handleOpenModal}>Sign in</button>
      </div>
      {isModalOpen && <LoginSignup closeModal={handleCloseModal} />}
    </div>
  );
}

export default Navbar;
