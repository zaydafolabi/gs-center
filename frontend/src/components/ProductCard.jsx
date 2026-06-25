import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // ADD THIS IMPORT
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart, isLoggedIn } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            alert('Please login first to add items to your cart!');
            window.location.href = '/login';
            return;
        }

        const productWithNumberPrice = {
            ...product,
            price: typeof product.price === 'string' ? parseFloat(product.price) : product.price
        };
        addToCart(productWithNumberPrice);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    const stockClass = product.stock > 10 ? 'in-stock' :
                       product.stock > 0 ? 'low-stock' : 'out-of-stock';
    const stockText = product.stock > 10 ? 'In Stock' :
                      product.stock > 0 ? 'Low Stock' : 'Out of Stock';
    
    const displayPrice = typeof product.price === 'string' ? parseFloat(product.price) : product.price;

    return (
        <div className="product-card">
            <div className="product-image">
                {product.image_url ? (
                    <img src={product.image_url} alt={product.name} />
                ) : (
                    <i className="fas fa-flask"></i>
                )}
            </div>
            <div className="product-body">
                {product.is_featured && <div className="featured-badge">⭐ Featured</div>}
                {product.category && <div className="product-category">{product.category}</div>}
                <h4>{product.name}</h4>
                <p className="description">{product.description || 'Premium TCM product'}</p>
                <div className="product-footer">
                    <span className="price">${displayPrice.toFixed(2)}</span>
                    <span className={`stock ${stockClass}`}>{stockText}</span>
                </div>
                {!isLoggedIn ? (
                    <Link to="/login" className="btn btn-secondary btn-sm" style={{ width: '100%', marginTop: 12 }}>
                        <i className="fas fa-lock"></i> Login to Add to Cart
                    </Link>
                ) : (
                    <button 
                        className={`btn ${isAdded ? 'btn-success' : 'btn-secondary'} btn-sm`}
                        style={{ width: '100%', marginTop: 12 }}
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                    >
                        <i className={`fas ${isAdded ? 'fa-check' : 'fa-shopping-cart'}`}></i> 
                        {isAdded ? ' Added!' : product.stock > 0 ? ' Add to Cart' : ' Out of Stock'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;