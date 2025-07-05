import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const AuthPage = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Optional future enhancements
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const authData = { email, password };
        if (!isLogin) authData.username = username;

        const endpoint = isLogin ? '/api/user/login' : '/api/user/register';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(authData),
            });

            let data = {};
            try {
                data = await response.json();
            } catch {
                return setError('Unexpected server response. Try again.');
            }

            if (response.ok) {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    onLogin();
                    navigate('/upload');
                } else {
                    alert(data.message || 'Signup successful!');
                    setIsLogin(true);
                }
            } else {
                setError(data.message || 'Login/Signup failed.');
            }
        } catch (err) {
            console.error(err);
            setError('Server error. Please try again later.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-header">
                <img src="/calendar.svg" alt="Timetable Icon" className="auth-icon" />
                <h2>Welcome to Timetable Generator</h2>
            </div>

            <div className="auth-tabs">
                <button
                    className={`auth-tab-button ${isLogin ? 'active' : ''}`}
                    onClick={() => {
                        setIsLogin(true);
                        setError('');
                    }}
                >
                    Login
                </button>
                <button
                    className={`auth-tab-button ${!isLogin ? 'active' : ''}`}
                    onClick={() => {
                        setIsLogin(false);
                        setError('');
                    }}
                >
                    Sign Up
                </button>
            </div>

            <p className="auth-description">
                Sign {isLogin ? 'in' : 'up'} to access your scheduling dashboard
            </p>

            <form onSubmit={handleSubmit} className="auth-form">
                {!isLogin && (
                    <div className="auth-input-group">
                        <label htmlFor="username">Username (Optional)</label>
                        <div className="auth-input-field">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                <div className="auth-input-group">
                    <label htmlFor="email">Email</label>
                    <div className="auth-input-field">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="auth-input-group">
                    <label htmlFor="password">Password</label>
                    <div className="auth-input-field">
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {error && <p className="auth-error-message">{error}</p>}

                <button type="submit" className="auth-submit-button">
                    Sign {isLogin ? 'In' : 'Up'}
                </button>
            </form>

            <button className="auth-close-button">X</button>
        </div>
    );
};

export default AuthPage;
