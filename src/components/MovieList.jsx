// src/components/MovieList.js
import { useState, useEffect } from "react";
import "./MoiveList.css"; // Ensure the CSS file name is correctly referenced

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("popularity.desc");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = "d1643824a81176e587be5c7c3ea339b6"; // Replace with your TMDb API key
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=${sort}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const filteredMovies =
          filter === "All"
            ? data.results
            : data.results.filter((movie) =>
                movie.genre_ids.includes(parseInt(filter))
              );
        setMovies(filteredMovies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [filter, sort]);

  const toggleFavorite = (movieId) => {
    const isFavorite = favorites.includes(movieId);
    setFavorites(
      isFavorite
        ? favorites.filter((id) => id !== movieId)
        : [...favorites, movieId]
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movie-list-container">
      <h1 className="movie-list-title">Movie List</h1>
      <div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Genres</option>
          <option value="28">Action</option>
          <option value="35">Comedy</option>
          {/* Add other genres as needed */}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="popularity.desc">Most Popular</option>
          <option value="release_date.desc">Newest</option>
        </select>
      </div>
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
            />
            <span>{movie.title}</span>
            <button onClick={() => toggleFavorite(movie.id)}>
              {favorites.includes(movie.id) ? "Unfavorite" : "Favorite"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
