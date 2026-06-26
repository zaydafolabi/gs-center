import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://gswellcenter.42web.io/backend/api';

const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            console.log('Fetching from:', `${API_URL}/services.php`);
            const response = await axios.get(`${API_URL}/services.php`);
            console.log('Services response:', response.data);
            
            if (response.data.success) {
                setServices(response.data.services);
            } else {
                setError('Failed to load services');
            }
        } catch (err) {
            console.error('Error fetching services:', err);
            setError('Error loading services: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-spinner">
                <i className="fas fa-spinner"></i> Loading services...
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

    if (services.length === 0) {
        return (
            <div className="empty-state">
                <i className="fas fa-spa"></i>
                <h3>No services available</h3>
                <p>Check back soon for our wellness services.</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="section-title">Our Services</h1>
            <p className="section-subtitle">Professional Traditional Chinese Medicine treatments for your wellness journey.</p>
            
            <div className="grid-3">
                {services.map(service => (
                    <div key={service.id} className="card service-card">
                        <div style={{ fontSize: 40, color: 'var(--secondary)', marginBottom: 12 }}>
                            <i className="fas fa-spa"></i>
                        </div>
                        <h3>{service.name}</h3>
                        <p style={{ color: 'var(--gray)', marginBottom: 8 }}>{service.description}</p>
                        <div style={{ marginBottom: 12 }}>
                            <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>${service.price}</span>
                            <span style={{ color: 'var(--gray)', fontSize: 14, marginLeft: 8 }}>({service.duration} min)</span>
                        </div>
                        <Link to="/login" className="btn btn-primary btn-sm">
                            <i className="fas fa-calendar-plus"></i> Book Now
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesPage;  // ✅ IMPORTANT: This must be at the end