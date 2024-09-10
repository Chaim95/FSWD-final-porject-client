import React, { useEffect, useState } from 'react';
import { getShowById } from '../Services/apiService';
import { useParams } from 'react-router-dom';
import styles from './Details.module.css';

function Details() {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    async function fetchShow() {
      try {
        const response = await getShowById(id);
        setShow(response);
      } catch (error) {
        console.error('Error fetching show:', error);
      }
    }
    fetchShow();
  }, [id]);

  if (!show) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{show.name}</h2>
        <div className={styles.buyContainer}>
          <button className={styles.buyButton}>Buy Tickets</button>
          <span className={styles.price}>${show.prices}</span>
        </div>
      </div>
      <div className={styles.posterContainer}>
        <img src={show.poster_url} alt={show.name} className={styles.poster} />
        <div className={styles.details}>
          <p><strong>Artist:</strong> {show.artist}</p>
          <p><strong>Date:</strong> {new Date(show.date).toLocaleDateString()}</p>
          <p><strong>Start Time:</strong> {show.hours_start}</p>
          <p><strong>End Time:</strong> {show.hours_finish}</p>
        </div>
      </div>
      <div className={styles.youtubeContainer}>
        <iframe 
          width="560" 
          height="315" 
          src={show.youtube_link} 
          title={show.name} 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen>
        </iframe>
      </div>
    </div>
  );
}

export default Details;
