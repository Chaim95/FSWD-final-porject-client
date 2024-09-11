import React, { useState, useEffect } from 'react';
import { getManagerShows, createShow, updateShow, deleteShow } from '../Services/apiService';
import styles from './ShowManagerPage.module.css';

function ShowManagerPage() {
  const [shows, setShows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newShow, setNewShow] = useState({
    name: '',
    date: '',
    hours_start: '',
    hours_finish: '',
    place_id: '',
    prices: '',
    artist: '',
    poster_url: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    fetchManagerShows();
  }, []);

  const fetchManagerShows = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await getManagerShows(token);
      setShows(response || []);
    } catch (error) {
      console.error('Failed to fetch shows:', error);
      setShows([]);
    }
  };

  const handleDelete = async (showId) => {
    const token = localStorage.getItem('token');
    try {
      await deleteShow(showId, token);
      fetchManagerShows();
    } catch (error) {
      console.error('Failed to delete show:', error);
    }
  };

  const handleEdit = (show) => {
    setSelectedShow(show);
    setNewShow(show);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleAddNewShow = () => {
    setEditMode(false);
    setNewShow({
      name: '',
      date: '',
      hours_start: '',
      hours_finish: '',
      place_id: '',
      prices: '',
      artist: '',
      poster_url: '',
      seats_count: ''
    });
    setOpenDialog(true);
  };

  const handleSaveShow = async (e) => {
    e.preventDefault(); 
    const token = localStorage.getItem('token');
    
    if (!newShow.name || !newShow.date || !newShow.hours_start || !newShow.hours_finish || !newShow.place_id || !newShow.prices || !newShow.artist || !newShow.poster_url) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      if (editMode) {
        await updateShow(selectedShow.id, newShow, token);
      } else {
        await createShow(newShow, token); 
      }
      fetchManagerShows();  
      setOpenDialog(false); 
    } catch (error) {
      console.error('Failed to save show:', error);
    }
  };

  const handleCancel = () => {
    setOpenDialog(false); 
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Manage Shows</h2>
      <button className={styles.addButton} onClick={handleAddNewShow}>Add New Show</button>
      <div className={styles.showList}>
        {shows.map((show) => (
          <div key={show.id} className={styles.showCard}>
            <div className={styles.showDetails}>
              <h3 className={styles.showTitle}>{show.name}</h3>
              <img src={show.poster_url} alt={show.name} className={styles.poster} />
              <p>Date: {show.date}</p>
              <p>Start Time: {show.hours_start}</p>
              <p>End Time: {show.hours_finish}</p>
              <p>Price: {show.prices}</p>
              <p>Artist: {show.artist}</p>
              <p>Seats Count: {show.seats_count}</p>
              <p>Sold Tickets: {show.seats_sold}</p>
              <p>Avialable Tickets: {show.seats_count - show.seats_sold}</p>
            </div>
            <div className={styles.actions}>
              <button className={styles.editButton} onClick={() => handleEdit(show)}>Edit</button>
              <button className={styles.deleteButton} onClick={() => handleDelete(show.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {openDialog && (
        <div className={styles.overlay}>
          <div className={styles.dialog}>
            <h2>{editMode ? 'Edit Show' : 'Add New Show'}</h2>
            <form onSubmit={handleSaveShow}>
              <input
                type="text"
                value={newShow.name}
                onChange={(e) => setNewShow({ ...newShow, name: e.target.value })}
                placeholder="Show Name"
                className={styles.input}
                required
              />
              <input
                type="date"
                value={newShow.date}
                onChange={(e) => setNewShow({ ...newShow, date: e.target.value })}
                className={styles.input}
                required
              />
              <input
                type="time"
                value={newShow.hours_start}
                onChange={(e) => setNewShow({ ...newShow, hours_start: e.target.value })}
                className={styles.input}
                required
              />
              <input
                type="time"
                value={newShow.hours_finish}
                onChange={(e) => setNewShow({ ...newShow, hours_finish: e.target.value })}
                className={styles.input}
                required
              />
              <input
                type="text"
                value={newShow.place_id}
                onChange={(e) => setNewShow({ ...newShow, place_id: e.target.value })}
                placeholder="Place ID"
                className={styles.input}
                required
              />
              <input
                type="text"
                value={newShow.prices}
                onChange={(e) => setNewShow({ ...newShow, prices: e.target.value })}
                placeholder="Price"
                className={styles.input}
                required
              />
              <input
                type="text"
                value={newShow.artist}
                onChange={(e) => setNewShow({ ...newShow, artist: e.target.value })}
                placeholder="Artist"
                className={styles.input}
                required
              />
               <input
                type="number"
                value={newShow.seats_count}
                onChange={(e) => setNewShow({ ...newShow, seats_count: e.target.value })}
                placeholder="Seats Count"
                className={styles.input}
                required
              />
              <input
                type="text"
                value={newShow.poster_url}
                onChange={(e) => setNewShow({ ...newShow, poster_url: e.target.value })}
                placeholder="Poster URL"
                className={styles.input}
                required
              />
              <div className={styles.buttonContainer}>
                <button type="button" className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
                <button type="submit" className={styles.saveButton}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowManagerPage;
