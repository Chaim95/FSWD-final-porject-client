import React, { useEffect, useState } from 'react';
import { getAllPlaces } from '../Services/apiService';

function PlaceSelector({ value, onChange }) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    async function fetchPlaces() {
      const response = await getAllPlaces();
      setPlaces(response);
    }
    fetchPlaces();
  }, []);

  return (
    <select value={value} onChange={onChange} style={styles.select}>
      <option value="">Select Place</option>
      {places.map((place) => (
        <option key={place.id} value={place.id}>
          {place.name}
        </option>
      ))}
    </select>
  );
}

const styles = {
  select: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    marginBottom: '10px',
  },
};

export default PlaceSelector;
