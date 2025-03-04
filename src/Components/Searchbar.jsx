import React, { useState } from "react";
import "../App.css";
import MovieDetail from "./MovieDetail";

function Searchbar() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchData = async (input) => {
    if (input.trim() === "") {
      setSearchResult([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=da60c1d4&s=${input}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setSearchResult(data.Search || []);
      } else {
        setSearchResult([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setSearchResult([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    fetchData(searchInput);
  };

  const handleMovieDetail = (title) => {
    setSelectedMovie(title);
  };

  const handleBack = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="container">
      {!selectedMovie && (
        <>
          <div className="search-container">
            <input
              className="searchbar"
              type="text"
              placeholder="Search movies..."
              value={searchInput}
              onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          {isLoading && <p>Loading...</p>}

          <div className="results-container">
            {searchResult.map((movie) => (
              <div
                key={movie.imdbID}
                className="movie-card"
                onClick={() => handleMovieDetail(movie.Title)}
              >
                <img src={movie.Poster} alt={movie.Title} />
                <h3>{movie.Title}</h3>
                <p>Year: {movie.Year}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {selectedMovie && (
        <div>
          <button onClick={handleBack}>Back to Search</button>
          <MovieDetail title={selectedMovie} />
        </div>
      )}
    </div>
  );
}

export default Searchbar;