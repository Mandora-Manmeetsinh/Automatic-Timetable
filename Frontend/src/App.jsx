import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './AuthPage';
import UploadPage from './UploadPage';
import Hello from './Hello';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log('User logged in successfully!');
  };

  return (
    <Router>
      <Hello />
      <div className="App">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Navigate to="/upload" /> : <AuthPage onLogin={handleLogin} />} />
          <Route path="/upload" element={isLoggedIn ? <UploadPage /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
