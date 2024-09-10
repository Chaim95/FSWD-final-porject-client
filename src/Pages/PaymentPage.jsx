import React, { useState } from 'react';

function PaymentPage() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  
  const handlePayment = (e) => {
    e.preventDefault();
    alert('Payment processed successfully!');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Payment Details</h2>
      <form onSubmit={handlePayment} style={styles.form}>
        <input
          type="text"
          placeholder="Cardholder Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Expiry Date (MM/YY)"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="text"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Submit Payment</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '250px',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
  },
};

export default PaymentPage;
