import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simple mock authentication - replace with real API call
    if (email && password) {
      const userData = { email, name: email.split('@')[0], provider: 'email' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const loginWithGoogle = () => {
    // Mock Google OAuth - replace with real Google OAuth flow
    const mockGoogleUser = {
      email: 'user@gmail.com',
      name: 'Google User',
      provider: 'google',
      avatar: 'https://lh3.googleusercontent.com/a/default-user=s96-c'
    };
    setUser(mockGoogleUser);
    localStorage.setItem('user', JSON.stringify(mockGoogleUser));
    return true;
  };

  const loginWithGitHub = () => {
    // Mock GitHub OAuth - replace with real GitHub OAuth flow
    const mockGitHubUser = {
      email: 'user@github.com',
      name: 'GitHub User',
      provider: 'github',
      avatar: 'https://github.com/octocat.png'
    };
    setUser(mockGitHubUser);
    localStorage.setItem('user', JSON.stringify(mockGitHubUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    loginWithGoogle,
    loginWithGitHub,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
