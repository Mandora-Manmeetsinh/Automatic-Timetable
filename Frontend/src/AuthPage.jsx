import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log('Login:', { email, password });
            // Implement login logic here
            navigate('/upload');
        } else {
            console.log('Sign Up:', { email, password });
            // Implement signup logic here
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
                    onClick={() => setIsLogin(true)}
                >
                    Login
                </button>
                <button
                    className={`auth-tab-button ${!isLogin ? 'active' : ''}`}
                    onClick={() => setIsLogin(false)}
                >
                    Sign Up
                </button>
            </div>
            <p className="auth-description">
                Sign {isLogin ? 'in' : 'up'} to access your scheduling dashboard
            </p>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-input-group">
                    <label htmlFor="email">Email</label>
                    <div className="auth-input-field">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="email"
                            id="email"
                            placeholder="admin@college.edu"
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
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className="auth-submit-button">
                    Sign {isLogin ? 'In' : 'Up'}
                </button>
            </form>
            <button className="auth-close-button">X</button>
        </div>
    );
};

export default AuthPage;