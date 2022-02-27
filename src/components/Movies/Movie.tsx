import { FC, createElement } from 'react';

import './styles/movie.css';

export const Movie: FC<{
  title: string;
  releaseDate: string;
  openingText: string;
}> = ({ title, releaseDate, openingText }) => {
  return (
    <li className='movie'>
      <h2>{title}</h2>
      <h3>{releaseDate}</h3>
      <p>{openingText}</p>
    </li>
  );
}