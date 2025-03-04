import React, { useEffect, useState } from "react";
import "../App.css";

function Searchbar() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (input) => {
    console.log(input);
    
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
      console.log(data);
      

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

  console.log(searchResult);
  

  return (
    <div>
      <div className="search-container">
        <input
          className="searchbar"
          type="text"
          placeholder="search movies..."
          value={searchInput}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {isLoading && <p>Loading...</p>}

      <div className="results-container">
        {searchResult.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>Year: {movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Searchbar;
