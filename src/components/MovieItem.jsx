const MovieItem = ({ movie, isFavorite, toggleFavorite }) => (
  <li className="movie-item">
    <img
      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
      alt={movie.title}
    />
    <span>{movie.title}</span>
    <button onClick={() => toggleFavorite(movie.id)}>
      {isFavorite ? "Unfavorite" : "Favorite"}
    </button>
  </li>
);

export default MovieItem;
