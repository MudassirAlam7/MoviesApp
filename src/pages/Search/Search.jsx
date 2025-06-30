// SearchResults.jsx or Search.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./search.css";

const Search = () => {
  const { query } = useParams();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/collection?query=${query}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setCollections(data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="search-results-container">
      <h1>Search Results for "{query}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : collections.length === 0 ? (
        <p>No collections found.</p>
      ) : (
        <div className="results-grid">
          {collections.map((item) => (
            
              <div className="result-card">
                <Link
              to={`/player/${item.id}`}
              className="item-card"
              key={item.id}
                >
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
                  alt={item.name}
                />
                <h3>{item.name}</h3>
                <p>{item.overview || "No overview available."}</p>
                </Link>
              </div>
           
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
