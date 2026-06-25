import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost/gs-wellness/backend/api';

// Create Cart Context
const CartContext = createContext();

// Cart Provider Component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    // Update cart summary
    const updateCartSummary = useCallback((items) => {
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        const total = items.reduce((sum, item) => {
            const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
            return sum + (price * item.quantity);
        }, 0);
        setCartCount(count);
        setCartTotal(total);
    }, []);

    // Load user's cart from database
    const loadUserCart = useCallback(async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/cart.php?user_id=${userId}`);
            if (response.data.success) {
                const items = response.data.cartItems || [];
                setCartItems(items);
                updateCartSummary(items);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        }
    }, [updateCartSummary]);

    // Save cart to database
    const saveCartToDatabase = useCallback(async (items) => {
        if (!userId) return;
        try {
            await axios.post(`${API_URL}/cart.php`, {
                user_id: userId,
                cart_items: items
            });
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    }, [userId]);

    // Check login status
    useEffect(() => {
        const savedUser = localStorage.getItem('gs_user');
        if (savedUser) {
            try {
                const user = JSON.parse(savedUser);
                setIsLoggedIn(true);
                setUserId(user.id);
                loadUserCart(user.id);
            } catch (e) {
                console.error('Error parsing user:', e);
            }
        }
    }, [loadUserCart]);

    // Add item to cart
    const addToCart = useCallback(async (product) => {
        if (!isLoggedIn) {
            alert('Please login first to add items to your cart!');
            window.location.href = '/login';
            return;
        }

        const price = typeof product.price === 'string' ? parseFloat(product.price) : product.price;
        
        setCartItems(prevItems => {
            const existingIndex = prevItems.findIndex(item => item.id === product.id);
            let updatedItems;
            
            if (existingIndex !== -1) {
                updatedItems = [...prevItems];
                updatedItems[existingIndex].quantity += 1;
            } else {
                updatedItems = [...prevItems, { 
                    id: product.id,
                    name: product.name,
                    price: price,
                    image_url: product.image_url,
                    quantity: 1 
                }];
            }
            
            saveCartToDatabase(updatedItems);
            updateCartSummary(updatedItems);
            return updatedItems;
        });
    }, [isLoggedIn, saveCartToDatabase, updateCartSummary]);

    // Remove item from cart
    const removeFromCart = useCallback((index) => {
        setCartItems(prev => {
            const updated = prev.filter((_, i) => i !== index);
            saveCartToDatabase(updated);
            updateCartSummary(updated);
            return updated;
        });
    }, [saveCartToDatabase, updateCartSummary]);

    // Update quantity
    const updateQuantity = useCallback((index, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(index);
            return;
        }
        setCartItems(prev => {
            const updated = [...prev];
            updated[index].quantity = newQuantity;
            saveCartToDatabase(updated);
            updateCartSummary(updated);
            return updated;
        });
    }, [removeFromCart, saveCartToDatabase, updateCartSummary]);

    // Clear cart
    const clearCart = useCallback(() => {
        setCartItems([]);
        updateCartSummary([]);
        saveCartToDatabase([]);
    }, [saveCartToDatabase, updateCartSummary]);

    // Checkout function
    const checkout = useCallback(async () => {
        if (!isLoggedIn) {
            alert('Please login first to checkout!');
            window.location.href = '/login';
            return;
        }

        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/orders.php`, {
                user_id: userId,
                cart_items: cartItems,
                total: cartTotal
            });

            if (response.data.success) {
                alert('✅ Order placed successfully! Thank you for your purchase.');
                clearCart();
                window.location.href = '/dashboard';
            } else {
                alert('Checkout failed: ' + (response.data.error || 'Please try again.'));
            }
        } catch (error) {
            alert('Error during checkout: ' + error.message);
            console.error('Checkout error:', error);
        }
    }, [isLoggedIn, cartItems, cartTotal, userId, clearCart]);

    return (
        <CartContext.Provider value={{
            cartItems,
            cartCount,
            cartTotal,
            isLoggedIn,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            checkout
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use cart
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};