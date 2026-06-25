import React from 'react';
import { Link } from 'react-router-dom';  // ADD THIS IMPORT
import { useCart } from '../context/CartContext';

const CartIcon = () => {
    const { cartCount } = useCart();

    return (
        <Link to="/cart" className="nav-link" style={{ position: 'relative' }}>
            <i className="fas fa-shopping-cart"></i>
            {cartCount > 0 && (
                <span className="cart-badge">
                    {cartCount}
                </span>
            )}
        </Link>
    );
};

export default CartIcon;