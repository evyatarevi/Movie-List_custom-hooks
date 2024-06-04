import { useState, useEffect } from "react";
import "./MoiveList.css"; // Ensure the CSS file name is correctly referenced
import Filters from "./Filters";
import MovieItems from "./MovieItems";

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
    setFavorites((prevFavorites) =>
      prevFavorites.includes(movieId)
        ? prevFavorites.filter((id) => id !== movieId)
        : [...prevFavorites, movieId]
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="movie-list-container">
      <h1 className="movie-list-title">Movie List</h1>
      <Filters
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />
      <MovieItems
        movies={movies}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default MovieList;
