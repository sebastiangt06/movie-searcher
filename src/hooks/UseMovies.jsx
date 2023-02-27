import { useRef, useState, useMemo, useCallback } from "react";
import { searchMovies } from "../services/service";

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previusSearch = useRef(search);

  const getMovies = useCallback(async ({ search }) => {
    if (search === previusSearch.current) return null;
    try {
      setLoading(true);
      setError(null);
      previusSearch.current = search;
      const moviesSearched = await searchMovies({ search });
      setMovies(moviesSearched);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /*  const sortedMovies = sort
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies; */

  const sortedMovies = useMemo(() => {
    console.log("memo");
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return { movies: sortedMovies, getMovies, loading };
}
