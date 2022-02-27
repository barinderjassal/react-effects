import { FC, createElement, Fragment } from 'react';
import { Movie } from './Movie';

import './styles/movies-list.css';

export const MoviesList: FC<any> = ({ movies }) => {
  return (
    <Fragment>
      <ul className="movies-list">
        {movies.map((movie: any) => (
          <Movie
            key={movie.id}
            title={movie.title}
            releaseDate={movie.release}
            openingText={movie.openingText}
          />
        ))}
      </ul>
    </Fragment>
  );
}