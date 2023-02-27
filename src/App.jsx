import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/UseMovies";
import { useState, useEffect, useRef, useCallback } from "react";
import debounce from "just-debounce-it";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstRef = useRef(true);

  useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = search === "";
      return;
    }
    if (search == "") {
      setError("No se puede buscar una pelicula vacia");
      return;
    }
    if (search.match(/^\d+$/)) {
      setError("No se pueden buscar peliculas con numeros");
      return;
    }
    if (search.length < 3) {
      setError("Debe haber mas de 3 caracteres");
      return;
    }
    setError(null);
  }, [search]);
  return { search, updateSearch, error };
}

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const debounceMovies = useCallback(
    debounce(search => {
      console.log("search debounce");
      getMovies({ search })
    }, 300)
    ,[getMovies]
  )

  const handleSort = () => {
    setSort(!sort);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //const fields = Object.fromEntries(new window.FormData(event.target)); // ENCAPSULA TODOS LOS INPUTS EN UN Objeto
    getMovies({ search });
    
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debounceMovies(newSearch)
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de peliculas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input
            value={search}
            onChange={handleChange}
            name="query"
            placeholder="Put your movie name"
            style={{
              border: "1px solid transparent",
              borderColor: error ? "red" : "transparent",
            }}
          />
          <input type="checkbox" onChange={handleSort} checked={sort}></input>
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
