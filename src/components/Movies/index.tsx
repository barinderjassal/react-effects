import { createElement, FC, Fragment, useCallback, useEffect, useState } from 'react';
import { useHttp } from '../../hooks/use-http';
import AddMovie from './AddMovie';
import { MoviesList } from './MoviesList';

import './styles/movies.css';

export const Movies: FC = () => {

  const [movies, setMovies] = useState({} as any);

  const { isError, isLoading, sendRequest: fetchMovies } = useHttp();

  const addMovieHandler = useCallback((movie: any) => {
    setMovies((prevState: any) => prevState.concat(movie));
  }, []);

  let content = <p>Found no Movies.</p>;

  if (movies.length) content = <MoviesList movies={movies} />

  if (isError) content = <p>{isError}</p>;

  if (isLoading) content = <p>Loading...</p>;

  // calling the api on the very first render
  useEffect(() => {
    const tranformData = (moviesObj: any) => {
      let initialMovies = [];
      for (const key in moviesObj) {
        initialMovies.push({
          id: key,
          title: moviesObj[key].title,
          openingText: moviesObj[key].openingText,
          releaseDate: moviesObj[key].releaseDate
        })
      }
      setMovies(initialMovies);
    };

    // get movies
    fetchMovies(
      {
        url: 'https://react-http-practice-c7fbb-default-rtdb.firebaseio.com/movies.json',
      },
      tranformData
    );
    
  }, [fetchMovies, addMovieHandler]);

  return (
    <Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
      </section>
      <section>
        {content}
      </section>
    </Fragment>
  );
}