import "./MoiveList.css"; // Ensure the CSS file name is correctly referenced
import Filters from "./Filters";
import MovieItems from "./MovieItems";
import useFetchMovie from "../hooks/useFetchMovie";
import useFavorites from "../hooks/useFavorites";

const MovieList = () => {
  const { error, loading, movies, sort, filter, setSort, setFilter } =
    useFetchMovie();

  const [favorites, toggleFavorite] = useFavorites();

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
