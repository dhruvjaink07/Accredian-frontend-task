import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Link } from '@mui/material';
import '../Login.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoginPage, setIsLoginPage] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isLoginPage && formData.password !== formData.confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

const endpoint = isLoginPage ? 'http://localhost:5000/login' : 'http://localhost:5000/signup';


      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log(`${isLoginPage ? 'Login' : 'Sign-up'} successful`, data);
      alert(`${isLoginPage ? 'Login' : 'Sign-up'} successful`);
    } catch (error) {
      console.error('Error:', error.message);
      alert('An error occurred');
    }
  };

  const handleSwitchForm = () => {
    setIsLoginPage(!isLoginPage);
  };

  return (
    <div className="login-container">
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} className="login-paper">
          <p className='styleText'>{isLoginPage ? 'Login Page' : 'Sign Up Page'}</p>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {!isLoginPage && (
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            )}
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {!isLoginPage && (
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isLoginPage ? 'Log In' : 'Sign Up'}
            </Button>
          </form>
          <section className='spacer'></section>
          <Link
            component="button"
            variant="body2"
            onClick={handleSwitchForm}
            style={{ textDecoration: 'none', cursor: 'pointer', border: '0px '}}
          >
            {isLoginPage ? "Haven't Register Yet? Come here" : 'Already have an account? Login here'}
          </Link>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginForm;
