import { useState } from "react";

const useFavorites = () => {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (movieId) => {
        setFavorites((prevFavorites) =>
            prevFavorites.includes(movieId)
                ? prevFavorites.filter((id) => id !== movieId)
                : [...prevFavorites, movieId]
        );
    };

    return [favorites, toggleFavorite];
}

export default useFavorites;