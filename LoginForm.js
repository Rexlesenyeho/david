import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsSignedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Assuming you have some logic to validate the login
    const isValidLogin = true; // Replace with actual validation

    if (isValidLogin) {
      localStorage.setItem('userRole', 'user'); // or whichever role you want to assign
      setIsSignedIn(true);
      navigate('/'); // Redirect to the dashboard after successful login
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;