import { useState } from "react";

export const MovieApp = () => {
  const [search, setSearch] = useState("");
  const [movieList, setMovieList] = useState([]);
  const urlBase = `https://api.themoviedb.org/3/search/movie`;
  const API_KEY = "21f42dff84a056951db0a2777b6817cd";

  const handleInputChange = ({ target }) => {
    setSearch(target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchMovies();
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${urlBase}?query=${search}&api_key=${API_KEY}&language=es-ES`
      );
      const data = await response.json();
      if (data.results) {
        setMovieList(data.results);
      } else {
        setMovieList([]);
      }
    } catch (error) {
      console.log(error);
      setMovieList([]);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  function roundUp(num, decimal){
    const factor =Math.pow(10,decimal)
    return(Math.ceil(num*factor)/factor)
  }
  return (
    <div className="container">
      <h1 className="title">AppMovie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Escribe una película"
          value={search}
          onChange={handleInputChange}
        />
        <button className="searchButton">Buscar</button>
      </form>
      {movieList.length > 0 && (
        <div className="movieList">
          {movieList.map((movie) => (
            <div key={movie.id} className="movieCard">
              {movie.poster_path && (
                <img
                  alt={'No hay imagen disponible'}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
              )}
              <h2>{movie.title}</h2>
              <p className="paragraph">{truncateText(movie.overview, 100)}</p>
              <div className="details">
                <div className="detailsP">
                  <p>Estrenada: {movie.release_date}</p>
                  <p>Valoracion TMBD: {roundUp(movie.vote_average, 1)}</p>
                </div>
                <button className="infoButton">Leer mas</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
