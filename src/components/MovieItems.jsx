import MovieItem from "./MovieItem";

const MovieItems = ({ movies, favorites, toggleFavorite }) => (
  <ul className="movie-list">
    {movies.map((movie) => (
      <MovieItem
        key={movie.id}
        movie={movie}
        isFavorite={favorites.includes(movie.id)}
        toggleFavorite={toggleFavorite}
      />
    ))}
  </ul>
);

export default MovieItems;
