import React from 'react';
import { Link } from 'react-router-dom';  // ADD THIS IMPORT
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { 
        cartItems, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        cartCount, 
        cartTotal,
        isLoggedIn,
        checkout 
    } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="empty-state">
                <i className="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Browse our products and add items you love.</p>
                <Link to="/products" className="btn btn-primary">
                    <i className="fas fa-shopping-bag"></i> Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2 className="section-title">Your Shopping Cart</h2>
            <p className="section-subtitle">{cartCount} items in your cart</p>
            
            {!isLoggedIn && (
                <div className="alert alert-error">
                    <i className="fas fa-exclamation-circle"></i>
                    Please <Link to="/login" style={{ fontWeight: 'bold', color: 'var(--primary)' }}>login</Link> to checkout.
                </div>
            )}
            
            <div className="cart-items">
                {cartItems.map((item, index) => {
                    const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
                    const total = price * item.quantity;
                    
                    return (
                        <div key={index} className="cart-item">
                            <div className="cart-item-image">
                                {item.image_url ? (
                                    <img src={item.image_url} alt={item.name} />
                                ) : (
                                    <i className="fas fa-flask"></i>
                                )}
                            </div>
                            
                            <div className="cart-item-details">
                                <h4>{item.name}</h4>
                                <p>${price.toFixed(2)}</p>
                            </div>
                            
                            <div className="cart-item-quantity">
                                <button 
                                    className="btn btn-outline btn-sm"
                                    onClick={() => updateQuantity(index, item.quantity - 1)}
                                >
                                    <i className="fas fa-minus"></i>
                                </button>
                                <span>{item.quantity}</span>
                                <button 
                                    className="btn btn-outline btn-sm"
                                    onClick={() => updateQuantity(index, item.quantity + 1)}
                                >
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                            
                            <div className="cart-item-total">
                                ${total.toFixed(2)}
                            </div>
                            
                            <button 
                                className="btn btn-danger btn-sm"
                                onClick={() => removeFromCart(index)}
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        </div>
                    );
                })}
            </div>

            <div className="cart-summary">
                <div className="cart-summary-content">
                    <div>
                        <h3>Total: <span className="cart-grand-total">${cartTotal.toFixed(2)}</span></h3>
                        <p>Items: {cartCount}</p>
                    </div>
                    <div className="cart-actions">
                        <button className="btn btn-secondary" onClick={clearCart}>
                            <i className="fas fa-times"></i> Clear Cart
                        </button>
                        <button 
                            className={`btn ${isLoggedIn ? 'btn-success' : 'btn-secondary'}`}
                            onClick={checkout}
                            disabled={!isLoggedIn}
                        >
                            <i className="fas fa-credit-card"></i> 
                            {isLoggedIn ? 'Checkout' : 'Login to Checkout'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;