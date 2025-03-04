import React, { useEffect, useState } from "react";

function MovieDetail({ title }) {

  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatTitleForURL = (title) => {
    return title.trim().replace(/\s+/g, "+");
  };

  const formattedTitle = formatTitleForURL(title);

  console.log(formattedTitle);
  

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=da60c1d4&t=`+ formattedTitle
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovieDetails(data);
        } else {
          setError(data.Error);
        }
      } catch (err) {
        setError("Failed to fetch movie details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetail();
  }, [title]);

  if (isLoading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;

  return (
    movieDetails && (
      <div className="movie-detail">
        <h2>{movieDetails.Title}</h2>
        <img src={movieDetails.Poster} alt={movieDetails.Title} />
        <p>Year: {movieDetails.Year}</p>
        <p>Genre: {movieDetails.Genre}</p>
        <p>Director: {movieDetails.Director}</p>
        <p>Actors: {movieDetails.Actors}</p>
        <p>Plot: {movieDetails.Plot}</p>
        <p>IMDB Rating: {movieDetails.imdbRating}</p>
      </div>
    )
  );
}

export default MovieDetail;

