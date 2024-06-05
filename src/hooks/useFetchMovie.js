import { useState, useEffect } from "react";

const useFetchMovie = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState("popularity.desc");

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

    return [error, loading, movies, sort, filter, setSort, setFilter];
}

export default useFetchMovie;