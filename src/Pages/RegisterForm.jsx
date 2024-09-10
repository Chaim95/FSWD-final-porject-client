import React, { useState } from 'react';
import { registerUser } from '../Services/apiService';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    type_of_user: 'regular'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="tel"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <div style={styles.radioContainer}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="type_of_user"
              value="regular"
              checked={formData.type_of_user === 'regular'}
              onChange={handleChange}
              style={styles.radioInput}
            />
            Customer
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="type_of_user"
              value="admin"
              checked={formData.type_of_user === 'admin'}
              onChange={handleChange}
              style={styles.radioInput}
            />
            Show Manager
          </label>
        </div>
        <button type="submit" style={styles.submitButton}>Register</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  radioContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  radioInput: {
    transform: 'scale(1.2)',
  },
  submitButton: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default RegisterForm;
