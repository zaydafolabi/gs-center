import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const API_URL = 'https://gswellcenter.42web.io/backend/api';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { addToCart } = useCart();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            console.log('Fetching from:', `${API_URL}/products.php`);
            const response = await axios.get(`${API_URL}/products.php`);
            console.log('Products response:', response.data);
            
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                setError('Failed to load products');
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            setError('Error loading products: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (product) => {
        const productWithNumberPrice = {
            ...product,
            price: typeof product.price === 'string' ? parseFloat(product.price) : product.price
        };
        addToCart(productWithNumberPrice);
    };

    // Get unique categories
    const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];
    
    // Filter products by category
    const filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(p => p.category === selectedCategory);

    if (loading) {
        return (
            <div className="loading-spinner">
                <i className="fas fa-spinner"></i> Loading products...
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-error">
                <i className="fas fa-exclamation-circle"></i> {error}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="empty-state">
                <i className="fas fa-box-open"></i>
                <h3>No products available</h3>
                <p>Check back soon for new FOHOW TCM products.</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="section-title">FOHOW TCM Products</h1>
            <p className="section-subtitle">Premium Traditional Chinese Medicine products for your health and wellness.</p>
            
            {/* Category Filters */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16, marginBottom: 24 }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`category-filter ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                            padding: '8px 20px',
                            border: selectedCategory === cat ? '2px solid var(--primary)' : '2px solid var(--gray-light)',
                            borderRadius: 'var(--radius-sm)',
                            background: selectedCategory === cat ? 'var(--primary)' : 'transparent',
                            color: selectedCategory === cat ? 'white' : '#000000',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '14px',
                            transition: 'var(--transition)',
                            fontFamily: 'Inter, sans-serif'
                        }}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>
            
            {/* Products Grid */}
            <div className="grid-3">
                {filteredProducts.map(product => {
                    const stockClass = product.stock > 10 ? 'in-stock' :
                                       product.stock > 0 ? 'low-stock' : 'out-of-stock';
                    const stockText = product.stock > 10 ? 'In Stock' :
                                      product.stock > 0 ? 'Low Stock' : 'Out of Stock';
                    const displayPrice = typeof product.price === 'string' ? parseFloat(product.price) : product.price;

                    return (
                        <div key={product.id} className="product-card">
                            <div className="product-image">
                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <i className="fas fa-flask"></i>
                                )}
                            </div>
                            <div className="product-body">
                                {product.is_featured && (
                                    <div className="featured-badge">⭐ Featured</div>
                                )}
                                {product.category && (
                                    <div style={{ fontSize: 12, color: 'var(--gray)', marginBottom: 4 }}>
                                        {product.category}
                                    </div>
                                )}
                                <h4>{product.name}</h4>
                                <p className="product-description" style={{ fontSize: 14, color: 'var(--gray)', marginBottom: 12 }}>
                                    {product.description || 'Premium TCM product'}
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                                    <span className="product-price" style={{ fontSize: 20, fontWeight: 700, color: 'var(--primary)' }}>
                                        ${displayPrice.toFixed(2)}
                                    </span>
                                    <span className={`stock ${stockClass}`} style={{ fontSize: 13, color: 'var(--gray)' }}>
                                        {stockText}
                                    </span>
                                </div>
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => handleAddToCart(product)}
                                    disabled={product.stock <= 0}
                                    style={{ width: '100%', marginTop: 12 }}
                                >
                                    <i className="fas fa-shopping-cart"></i> Add to Cart
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductsPage;  