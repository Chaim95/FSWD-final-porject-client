import React, { useState, useEffect } from 'react';
import { getUserTickets } from '../Services/apiService';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const userData = await getUserTickets(token); 
        setUser(userData.user); 
        setTickets(userData.tickets || []);  
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
    fetchProfile();
  }, [token]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Profile Information</h2>
      {user && (
        <>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <h3 style={styles.subheading}>Your Tickets</h3>
          {tickets.length > 0 ? (
            <ul style={styles.ticketList}>
              {tickets.map((ticket) => (
                <li key={ticket.id} style={styles.ticketItem}>
                  {ticket.show_name} - {ticket.date}
                </li>
              ))}
            </ul>
          ) : (
            <p>You have no tickets.</p>
          )}
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  subheading: {
    marginTop: '20px',
    fontSize: '24px',
  },
  ticketList: {
    listStyleType: 'none',
    padding: '0',
  },
  ticketItem: {
    padding: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    marginBottom: '10px',
  },
};

export default ProfilePage;
