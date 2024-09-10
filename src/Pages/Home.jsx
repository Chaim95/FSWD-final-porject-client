import React, { useEffect, useState } from 'react';
import { getPagingShows } from '../Services/apiService';
import './Home.css'; 

function Home() {
  const [shows, setShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  useEffect(() => {
    async function fetchShows() {
      try {
        const response = await getPagingShows(currentPage, limit);
        if (response && response.shows) {
          setShows(response.shows);
          setTotalPages(response.totalPages);
        } else {
          setShows([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error('Error fetching shows:', error);
        setShows([]);
        setTotalPages(1);
      }
    }
    fetchShows();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Available Shows</h2>
      {shows.length === 0 ? (
        <p className="noShows">No shows available at the moment.</p>
      ) : (
        <div className="showsGrid">
          {shows.map((show) => (
            <div key={show.id} className="showCard">
              <img src={show.poster_url} alt={show.name} className="poster" />
              <div className="showDetails">
                <h3>{show.name}</h3>
                <p>Artist: {show.artist}</p>
                <p>Price: ${show.prices}</p>
              </div>
              <button
                className="detailsButton"
                onClick={() => (window.location.href = `/details/${show.id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pageButton">
          Previous
        </button>
        <span className="pageInfo">Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pageButton">
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
