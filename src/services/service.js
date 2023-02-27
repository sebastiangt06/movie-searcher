const API_KEY = "f8123dc";
export const searchMovies = async ({ search }) => {
  if (search == "") return null
  try {
    if (search) {
      let response = await fetch(
        ` https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
      ); //CON ASYNC AWAIT
      let json = await response.json();
      /* fetch(` http://www.omdbapi.com/?apikey=f8123dc&s=${search}`) CON PROMESAS
        .then(res => res.json())
        .then(json => {
          setResponseMovies(json)
        }) */
      const movies = json.Search;
      return movies?.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      }));
    }
  } catch (e) {
    throw new Error("Error searching movies");
  }
};
