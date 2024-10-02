import React, { useState } from 'react';
import './LoginSignup.css';

function LoginSignup({ closeModal }) {
  // State to track whether it's the login or signup form
  const [isSignUp, setIsSignUp] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      closeModal(); // Call closeModal after the fade-out animation is complete
    }, 300); // Match this duration with the fade-out animation time
  };

  return (
    <div className={`modal-overlay ${isClosing ? 'fade-out' : ''}`}>
      <div className={`modal ${isClosing ? 'fade-out' : ''}`}>
        <button className="close-btn" onClick={handleClose}>X</button>
        
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

        <form>
          {/* Common Fields */}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          {/* Conditional rendering for sign-up form */}
          {isSignUp && <input type="text" placeholder="Full Name" required />}

          <button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</button>
        </form>

        <div className="modal-footer">
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <span className="link" onClick={() => setIsSignUp(false)}>Sign in</span>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <span className="link" onClick={() => setIsSignUp(true)}>Sign up</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
