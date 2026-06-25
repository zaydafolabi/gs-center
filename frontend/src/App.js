import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { useCart } from './context/CartContext';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import CartIcon from './components/CartIcon';
import './styles.css';

const API_URL = 'https://gswellcenter.42web.io/backend/api';
// =============================================
// HEADER COMPONENT
// =============================================
const Header = ({ user, onLogout }) => {
    return (
        <header className="header">
            <div className="container header-content">
                <Link to="/" className="logo">
                    <div className="logo-icon"><i className="fas fa-leaf"></i></div>
                    <div className="logo-text">GS<span>Center</span></div>
                </Link>
                <nav className="nav-menu">
                    <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About Us</NavLink>
                    <NavLink to="/services" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Services</NavLink>
                    <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Products</NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
                    
                    <CartIcon />

                    {user ? (
                        <>
                            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                                <i className="fas fa-user-circle"></i> Dashboard
                            </NavLink>
                            <button className="btn btn-logout btn-sm" onClick={onLogout}>
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </button>
                        </>
                    ) : (
                        <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                            <i className="fas fa-sign-in-alt"></i> Login
                        </NavLink>
                    )}
                </nav>
            </div>
        </header>
    );
};

// =============================================
// HOME PAGE
// =============================================
const HomePage = ({ services, products }) => {
    const featuredServices = services.slice(0, 3);

    return (
        <>
            <div className="hero">
                <div className="container hero-content">
                    <div className="hero-text">
                        <h1>Welcome to <span>GS Center</span></h1>
                        <p>Your trusted destination for Traditional Chinese Medicine, holistic wellness, and premium FOHOW products. Experience healing through ancient wisdom.</p>
                        <div className="hero-stats">
                            <div className="hero-stat"><h3>500+</h3><p>Happy Clients</p></div>
                            <div className="hero-stat"><h3>4.9</h3><p>★ Rating</p></div>
                            <div className="hero-stat"><h3>15+</h3><p>Years Experience</p></div>
                        </div>
                        <div className="hero-buttons">
                            <Link to="/services" className="btn btn-secondary">
                                <i className="fas fa-spa"></i> Our Services
                            </Link>
                            <Link to="/products" className="btn btn-outline">
                                <i className="fas fa-shopping-bag"></i> Shop Products
                            </Link>
                        </div>
                    </div>
                    <div className="hero-image">
                        <i className="fas fa-heartbeat"></i>
                    </div>
                </div>
            </div>

            <section style={{ marginBottom: 50 }}>
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <h2 className="section-title">Our Wellness Services</h2>
                    <p className="section-subtitle">Discover the healing power of Traditional Chinese Medicine</p>
                    <div style={{ width: 60, height: 4, background: 'var(--secondary)', margin: '0 auto' }}></div>
                </div>
                
                <div className="grid-3">
                    {featuredServices.map((service, index) => {
                        const icons = ['fa-heartbeat', 'fa-spa', 'fa-leaf'];
                        const colors = ['var(--secondary)', 'var(--accent)', 'var(--success)'];
                        return (
                            <div key={service.id} className="service-card" style={{
                                background: 'var(--white)',
                                borderRadius: 'var(--radius)',
                                padding: '32px 24px',
                                textAlign: 'center',
                                boxShadow: 'var(--shadow)',
                                transition: 'var(--transition)',
                                borderTop: `4px solid ${colors[index % colors.length]}`
                            }}>
                                <div style={{
                                    width: 70,
                                    height: 70,
                                    borderRadius: '50%',
                                    background: `linear-gradient(135deg, ${colors[index % colors.length]}22, ${colors[index % colors.length]}44)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px',
                                    fontSize: 30,
                                    color: colors[index % colors.length]
                                }}>
                                    <i className={`fas ${icons[index % icons.length]}`}></i>
                                </div>
                                <h3 style={{ fontSize: 20, color: 'var(--primary)', marginBottom: 8 }}>{service.name}</h3>
                                <p style={{ color: 'var(--gray)', fontSize: 14, lineHeight: 1.6 }}>{service.description}</p>
                                <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                                    <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>${service.price}</span>
                                    <span style={{ color: 'var(--gray)', fontSize: 13 }}>{service.duration} min</span>
                                </div>
                                <Link to="/services" style={{ 
                                    display: 'inline-block',
                                    marginTop: 16,
                                    color: 'var(--primary)',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    fontSize: 14
                                }}>
                                    Learn More <i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                        );
                    })}
                </div>
                
                <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <Link to="/services" className="btn btn-primary">
                        <i className="fas fa-spa"></i> View All Services
                    </Link>
                </div>
            </section>

            <section style={{ 
                background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))',
                padding: '50px 40px',
                borderRadius: 'var(--radius)',
                color: 'white',
                textAlign: 'center',
                marginBottom: 50,
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <i className="fas fa-quote-left" style={{ fontSize: 40, opacity: 0.3, display: 'block', marginBottom: 16 }}></i>
                    <h2 style={{ fontSize: 28, fontWeight: 700, maxWidth: 700, margin: '0 auto 16px' }}>
                        "The healing power of nature is the greatest medicine of all."
                    </h2>
                    <p style={{ opacity: 0.8, fontSize: 16 }}>Experience the ancient wisdom of Traditional Chinese Medicine at GS Center</p>
                    <div style={{ marginTop: 20, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/services" className="btn btn-secondary">
                            <i className="fas fa-calendar-plus"></i> Book a Session
                        </Link>
                        <Link to="/products" className="btn btn-outline">
                            <i className="fas fa-shopping-bag"></i> Shop Products
                        </Link>
                    </div>
                </div>
                <div style={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'rgba(232, 185, 49, 0.05)'
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: -80,
                    left: -80,
                    width: 300,
                    height: 300,
                    borderRadius: '50%',
                    background: 'rgba(78, 205, 196, 0.05)'
                }}></div>
            </section>

            <section style={{ marginBottom: 40 }}>
                <h2 className="section-title">Featured Products</h2>
                <p className="section-subtitle">Premium FOHOW Traditional Chinese Medicine products</p>
                <div className="grid-3">
                    {products.filter(p => p.is_featured).slice(0, 3).map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <Link to="/products" className="btn btn-primary">View All Products</Link>
                </div>
            </section>
        </>
    );
};

// =============================================
// ABOUT PAGE
// =============================================
const AboutPage = () => (
    <div>
        <h1 className="section-title">About GS Center</h1>
        <p className="section-subtitle">Your trusted partner in Traditional Chinese Medicine and holistic wellness.</p>
        <div className="grid-2">
            <div className="card">
                <h3><i className="fas fa-leaf" style={{ color: 'var(--secondary)' }}></i> Our Mission</h3>
                <p style={{ color: 'var(--gray)', lineHeight: 1.8 }}>
                    At GS Center, we are dedicated to bringing the ancient wisdom of Traditional Chinese Medicine 
                    to modern wellness seekers. Our mission is to provide holistic, natural healing solutions 
                    that promote balance, vitality, and overall well-being.
                </p>
            </div>
            <div className="card">
                <h3><i className="fas fa-user-md" style={{ color: 'var(--secondary)' }}></i> Our Practitioners</h3>
                <p style={{ color: 'var(--gray)', lineHeight: 1.8 }}>
                    Our team consists of certified TCM practitioners with over 15 years of combined experience. 
                    Each practitioner is dedicated to providing personalized care tailored to your unique health needs.
                </p>
            </div>
            <div className="card">
                <h3><i className="fas fa-flask" style={{ color: 'var(--secondary)' }}></i> FOHOW Products</h3>
                <p style={{ color: 'var(--gray)', lineHeight: 1.8 }}>
                    We proudly offer FOHOW International products - premium Traditional Chinese Medicine 
                    supplements and wellness products. All products are sourced from trusted manufacturers 
                    and meet the highest quality standards.
                </p>
            </div>
            <div className="card">
                <h3><i className="fas fa-heart" style={{ color: 'var(--secondary)' }}></i> Our Values</h3>
                <p style={{ color: 'var(--gray)', lineHeight: 1.8 }}>
                    We believe in holistic healing, patient-centered care, and the power of natural medicine. 
                    Our commitment to excellence ensures that every client receives the highest quality care 
                    and products.
                </p>
            </div>
        </div>
    </div>
);

// =============================================
// SERVICES PAGE
// =============================================
const ServicesPage = ({ services, user, onBook }) => (
    <div>
        <h1 className="section-title">Our Services</h1>
        <p className="section-subtitle">Professional Traditional Chinese Medicine treatments for your wellness journey.</p>
        <div className="grid-3">
            {services.map(service => (
                <div key={service.id} className="card">
                    <div style={{ fontSize: 40, color: 'var(--secondary)', marginBottom: 12 }}>
                        <i className="fas fa-spa"></i>
                    </div>
                    <h3>{service.name}</h3>
                    <p style={{ color: 'var(--gray)', marginBottom: 8 }}>{service.description}</p>
                    <p style={{ marginBottom: 8 }}>
                        <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>${service.price}</span>
                        <span style={{ color: 'var(--gray)', fontSize: 14, marginLeft: 8 }}>({service.duration} min)</span>
                    </p>
                    {user ? (
                        <button className="btn btn-primary btn-sm" onClick={() => onBook(service.id)}>
                            <i className="fas fa-calendar-plus"></i> Book Now
                        </button>
                    ) : (
                        <Link to="/login" className="btn btn-secondary btn-sm">
                            <i className="fas fa-sign-in-alt"></i> Login to Book
                        </Link>
                    )}
                </div>
            ))}
        </div>
    </div>
);

// =============================================
// PRODUCTS PAGE
// =============================================
const ProductsPage = ({ products }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];
    const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);

    return (
        <div>
            <h1 className="section-title">FOHOW TCM Products</h1>
            <p className="section-subtitle">Premium Traditional Chinese Medicine products for your health and wellness.</p>
            
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
            
            <div className="grid-3">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

// =============================================
// CONTACT PAGE
// =============================================
const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div>
            <h1 className="section-title">Contact Us</h1>
            <p className="section-subtitle">We'd love to hear from you. Reach out with any questions or feedback.</p>
            <div className="grid-2">
                <div>
                    <div className="card" style={{ marginBottom: 20 }}>
                        <h3><i className="fas fa-map-marker-alt" style={{ color: 'var(--secondary)' }}></i> Location</h3>
                        <p style={{ color: 'var(--gray)' }}>123 Wellness Street<br />Nigeria, NY 10001</p>
                    </div>
                    <div className="card" style={{ marginBottom: 20 }}>
                        <h3><i className="fas fa-phone" style={{ color: 'var(--secondary)' }}></i> Phone</h3>
                        <p style={{ color: 'var(--gray)' }}>+234 806 196 5586</p>
                    </div>
                    <div className="card">
                        <h3><i className="fas fa-envelope" style={{ color: 'var(--secondary)' }}></i> Email</h3>
                        <p style={{ color: 'var(--gray)' }}>mustaphaganiyat47@gmail.com</p>
                    </div>
                </div>
                <div className="card">
                    <h3>Send Us a Message</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Your Name <span className="required">*</span></label>
                            <input type="text" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>Email Address <span className="required">*</span></label>
                            <input type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label>Message <span className="required">*</span></label>
                            <textarea rows="4" placeholder="Your message..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '12px 16px', border: '2px solid var(--gray-light)', borderRadius: 'var(--radius-sm)', fontFamily: 'Inter, sans-serif' }} required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                            <i className="fas fa-paper-plane"></i> Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

// =============================================
// LOGIN PAGE
// =============================================
const LoginPage = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2><i className="fas fa-sign-in-alt" style={{ color: 'var(--primary)', marginRight: 10 }}></i> Welcome Back</h2>
                <p className="subtitle">Login to manage your appointments and wellness journey.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address <span className="required">*</span></label>
                        <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password <span className="required">*</span></label>
                        <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        <i className="fas fa-arrow-right"></i> Login
                    </button>
                    <div className="auth-link">
                        <Link to="/register">Don't have an account? Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

// =============================================
// REGISTER PAGE
// =============================================
const RegisterPage = ({ onRegister }) => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(formData);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2><i className="fas fa-user-plus" style={{ color: 'var(--success)', marginRight: 10 }}></i> Create Account</h2>
                <p className="subtitle">Join GS Center and start your wellness journey today.</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name <span className="required">*</span></label>
                        <input type="text" name="full_name" placeholder="John Doe" value={formData.full_name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email Address <span className="required">*</span></label>
                        <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Password <span className="required">*</span></label>
                            <input type="password" name="password" placeholder="Min 8 chars" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" name="phone" placeholder="+1 234 567 890" value={formData.phone} onChange={handleChange} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success" style={{ width: '100%' }}>
                        <i className="fas fa-user-plus"></i> Register
                    </button>
                    <div className="auth-link">
                        <Link to="/login">Already have an account? Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

// =============================================
// DASHBOARD PAGE
// =============================================
const DashboardPage = ({ user, appointments, services, onCancel, onBook }) => {
    const [activeTab, setActiveTab] = useState('book');

    return (
        <div>
            <div className="dashboard-welcome">
                <div>
                    <h2>
                        <i className="fas fa-spa"></i>
                        Welcome back, <span>{user?.full_name}</span>
                    </h2>
                    <p>Manage your appointments and explore our wellness offerings.</p>
                </div>
                <Link to="/cart" className="dashboard-cart-link">
                    <i className="fas fa-shopping-cart"></i> View Cart
                </Link>
            </div>

            <div className="tabs">
                <button className={`tab ${activeTab === 'book' ? 'active' : ''}`} onClick={() => setActiveTab('book')}>
                    <i className="fas fa-calendar-plus"></i> Book Appointment
                </button>
                <button className={`tab ${activeTab === 'appointments' ? 'active' : ''}`} onClick={() => setActiveTab('appointments')}>
                    <i className="fas fa-list-ul"></i> My Appointments
                </button>
                <button className={`tab ${activeTab === 'cart' ? 'active' : ''}`} onClick={() => setActiveTab('cart')}>
                    <i className="fas fa-shopping-cart"></i> My Cart
                </button>
            </div>

            {activeTab === 'book' && <BookingForm services={services} onBook={onBook} />}
            {activeTab === 'appointments' && <AppointmentsList appointments={appointments} onCancel={onCancel} />}
            {activeTab === 'cart' && <Cart />}
        </div>
    );
};

// =============================================
// BOOKING FORM
// =============================================
const BookingForm = ({ services, onBook }) => {
    const [serviceId, setServiceId] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadSlots = async (selectedDate) => {
        if (!selectedDate) return;
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/appointments.php?action=available&date=${selectedDate}`);
            if (response.data.success) setAvailableSlots(response.data.slots);
        } catch (error) { console.error('Error loading slots:', error); }
        setLoading(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (serviceId && date && time) {
            onBook(serviceId, date, time);
            setServiceId('');
            setDate('');
            setTime('');
            setAvailableSlots([]);
        }
    };

    return (
        <div className="card" style={{ maxWidth: 600, margin: '0 auto' }}>
            <h3 style={{ fontSize: 20, color: 'var(--primary)', marginBottom: 4 }}>
                <i className="fas fa-calendar-plus" style={{ color: 'var(--secondary)' }}></i> Book an Appointment
            </h3>
            <p style={{ color: 'var(--gray)', marginBottom: 20 }}>Select your preferred service, date, and time.</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Select Service <span className="required">*</span></label>
                    <select value={serviceId} onChange={(e) => setServiceId(e.target.value)} required>
                        <option value="">Choose a service...</option>
                        {services.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name} — ${service.price} ({service.duration} min)
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Date <span className="required">*</span></label>
                    <input type="date" value={date} onChange={(e) => { setDate(e.target.value); loadSlots(e.target.value); }} required />
                </div>
                <div className="form-group">
                    <label>Time <span className="required">*</span></label>
                    <select value={time} onChange={(e) => setTime(e.target.value)} required disabled={loading}>
                        <option value="">{loading ? 'Loading...' : 'Select available time...'}</option>
                        {availableSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    <i className="fas fa-check-circle"></i> Book Now
                </button>
            </form>
        </div>
    );
};

// =============================================
// APPOINTMENTS LIST
// =============================================
const AppointmentsList = ({ appointments, onCancel }) => {
    if (!appointments || appointments.length === 0) {
        return (
            <div className="empty-state">
                <i className="fas fa-calendar-times"></i>
                <h3>No appointments yet</h3>
                <p>Book your first wellness session today!</p>
            </div>
        );
    }

    return (
        <div style={{ display: 'grid', gap: 16 }}>
            {appointments.map(appt => (
                <div key={appt.id} className="appointment-card">
                    <div className="appointment-header">
                        <h4>{appt.service_name}</h4>
                        <span className={`status-badge status-${appt.status}`}>
                            {appt.status.replace('_', ' ')}
                        </span>
                    </div>
                    <div className="appointment-meta">
                        <span><i className="fas fa-calendar-day"></i> {appt.appointment_date}</span>
                        <span><i className="fas fa-clock"></i> {appt.appointment_time}</span>
                        <span><i className="fas fa-tag"></i> ${appt.price}</span>
                    </div>
                    {appt.status !== 'cancelled' && (
                        <div style={{ marginTop: 12 }}>
                            <button className="btn btn-danger btn-sm" onClick={() => onCancel(appt.id)}>
                                <i className="fas fa-times"></i> Cancel
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

// =============================================
// ALERT COMPONENT
// =============================================
const Alert = ({ message, type }) => {
    if (!message) return null;
    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
    return (
        <div className={`alert alert-${type}`}>
            <i className={`fas ${icons[type] || icons.info}`}></i> {message}
        </div>
    );
};

// =============================================
// FOOTER
// =============================================
const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div className="footer-grid">
                <div>
                    <div className="logo" style={{ marginBottom: 12 }}>
                        <div className="logo-icon" style={{ width: 40, height: 40, fontSize: 18 }}>
                            <i className="fas fa-leaf"></i>
                        </div>
                        <div className="logo-text" style={{ fontSize: 20 }}>GS<span>Center</span></div>
                    </div>
                    <p>Experience the healing power of Traditional Chinese Medicine. Your journey to wellness starts here.</p>
                </div>
                <div>
                    <h4>Quick Links</h4>
                    <Link to="/about">About Us</Link><br />
                    <Link to="/services">Services</Link><br />
                    <Link to="/products">Products</Link><br />
                    <Link to="/contact">Contact</Link>
                </div>
                <div>
                    <h4>Services</h4>
                    <Link to="/services">TCM Consultation</Link><br />
                    <Link to="/services">Acupuncture</Link><br />
                    <Link to="/services">Herbal Medicine</Link><br />
                    <Link to="/services">Tui Na Massage</Link>
                </div>
                <div>
                    <h4>Contact</h4>
                    <p><i className="fas fa-map-marker-alt"></i> 123 Wellness Street</p>
                    <p><i className="fas fa-phone"></i> +1 234 567 890</p>
                    <p><i className="fas fa-envelope"></i> info@gscenter.com</p>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2026 GS Center. All rights reserved. Made with <i className="fas fa-heart" style={{ color: 'var(--danger)' }}></i> for wellness.
            </div>
        </div>
    </footer>
);

// =============================================
// MAIN APP
// =============================================
function App() {
    const [user, setUser] = useState(null);
    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [alert, setAlert] = useState({ message: '', type: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem('gs_user');
        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                fetchAppointments(parsedUser.id);
            } catch (e) { console.error('Error parsing user:', e); }
        }
        fetchServices();
        fetchProducts();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get(`${API_URL}/services.php`);
            if (response.data.success) setServices(response.data.services);
        } catch (error) { console.error('Error fetching services:', error); }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${API_URL}/products.php`);
            if (response.data.success) setProducts(response.data.products);
        } catch (error) { console.error('Error fetching products:', error); }
        setLoading(false);
    };

    const fetchAppointments = async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/appointments.php?user_id=${userId}`);
            if (response.data.success) setAppointments(response.data.appointments);
        } catch (error) { console.error('Error fetching appointments:', error); }
    };

    const showAlert = (message, type = 'info') => {
        setAlert({ message, type });
        setTimeout(() => setAlert({ message: '', type: '' }), 5000);
    };

    const handleLogin = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth.php?action=login`, { email, password });
            if (response.data.success) {
                const userData = response.data.user;
                setUser(userData);
                localStorage.setItem('gs_user', JSON.stringify(userData));
                showAlert(`Welcome back, ${userData.full_name}!`, 'success');
                fetchAppointments(userData.id);
                window.location.href = '/dashboard';
            } else {
                showAlert(response.data.error || 'Login failed', 'error');
            }
        } catch (error) {
            showAlert('Error: ' + error.message, 'error');
        }
    };

    const handleRegister = async (formData) => {
        try {
            const response = await axios.post(`${API_URL}/auth.php?action=register`, formData);
            if (response.data.success) {
                showAlert('Registration successful! Please login.', 'success');
                window.location.href = '/login';
            } else {
                showAlert(response.data.error || 'Registration failed', 'error');
            }
        } catch (error) {
            showAlert('Error: ' + error.message, 'error');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('gs_user');
        setUser(null);
        setAppointments([]);
        showAlert('Logged out successfully', 'info');
        window.location.href = '/';
    };

    const handleBookAppointment = async (serviceId, date, time) => {
        if (!user) { showAlert('Please login first', 'error'); return; }
        try {
            const response = await axios.post(`${API_URL}/appointments.php`, {
                user_id: user.id,
                service_id: serviceId,
                appointment_date: date,
                appointment_time: time
            });
            if (response.data.success) {
                showAlert('✅ Appointment booked successfully!', 'success');
                fetchAppointments(user.id);
            } else {
                showAlert(response.data.error || 'Booking failed', 'error');
            }
        } catch (error) {
            showAlert('Error: ' + error.message, 'error');
        }
    };

    const handleCancelAppointment = async (appointmentId) => {
        if (!window.confirm('Cancel this appointment?')) return;
        try {
            const response = await axios.put(`${API_URL}/appointments.php?action=cancel`, {
                appointment_id: appointmentId
            });
            if (response.data.success) {
                showAlert('Appointment cancelled', 'success');
                fetchAppointments(user.id);
            } else {
                showAlert(response.data.error || 'Cancellation failed', 'error');
            }
        } catch (error) {
            showAlert('Error: ' + error.message, 'error');
        }
    };

    const handleBookFromService = (serviceId) => {
        if (!user) { showAlert('Please login first', 'error'); return; }
        window.location.href = '/dashboard';
        sessionStorage.setItem('selectedService', serviceId);
    };

    if (loading) return <div className="loading-spinner"><i className="fas fa-spinner"></i> Loading...</div>;

    return (
        <Router>
            <Header user={user} onLogout={handleLogout} />
            <main>
                <div className="container">
                    <Alert message={alert.message} type={alert.type} />
                    <Routes>
                        <Route path="/" element={<HomePage services={services} products={products} />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/services" element={<ServicesPage services={services} user={user} onBook={handleBookFromService} />} />
                        <Route path="/products" element={<ProductsPage products={products} />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                        <Route path="/register" element={<RegisterPage onRegister={handleRegister} />} />
                        <Route path="/dashboard" element={
                            user ? (
                                <DashboardPage 
                                    user={user} 
                                    appointments={appointments} 
                                    services={services}
                                    onCancel={handleCancelAppointment}
                                    onBook={handleBookAppointment}
                                />
                            ) : (
                                <div className="empty-state">
                                    <i className="fas fa-lock"></i>
                                    <h3>Please Login</h3>
                                    <p>You need to be logged in to access your dashboard.</p>
                                    <Link to="/login" className="btn btn-primary" style={{ marginTop: 16 }}>Login</Link>
                                </div>
                            )
                        } />
                    </Routes>
                </div>
            </main>
            <Footer />
        </Router>
    );
}

export default App;