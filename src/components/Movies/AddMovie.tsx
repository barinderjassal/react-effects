import { FC, useRef, createElement } from 'react';
import { useHttp } from '../../hooks/use-http';

import './styles/add-movie.css';

export const AddMovie: FC<any> = ({ onAddMovie }) => {
  
  const { isError, isLoading, sendRequest: sendAddMovieRequest } = useHttp();
  const titleRef = useRef('' as any);
  const openingTextRef = useRef('' as any);
  const releaseDateRef = useRef('' as any);

  const createMovie = (enteredMovie: any, movieData: any) => {
    const id = movieData.name;
    const createdMovie = {
      id: id,
      title: enteredMovie.title,
      openingText: enteredMovie.openingText,
      releaseDate: enteredMovie.releaseDate
    }
    onAddMovie(createdMovie);
  };

  const submitHandler = (event: any) => {
    event.preventDefault();

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    // send movie request
    sendAddMovieRequest(
      {
        url: 'https://react-http-practice-c7fbb-default-rtdb.firebaseio.com/movies.json',
        method: 'POST',
        body: movie,
        headers: {
          'Content-Type': 'application/json'
        }
      }, createMovie.bind(null, movie));
  };

  let content;

  if (isError) content = <p>{isError}</p>;

  if (isLoading) content = <p>Loading...</p>;

  return (
    <form onSubmit={submitHandler}>
      <div className='control'>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} />
      </div>
      <div className='control'>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea id='opening-text' ref={openingTextRef}></textarea>
      </div>
      <div className='control'>
        <label htmlFor='date'>Release Date</label>
        <input type='date' id='date' ref={releaseDateRef} />
      </div>
      <button>Add Movie</button>
      {content}
    </form>
  );
}

export default AddMovie;
