import React from 'react';

const MovieCard = ({ title, director, releaseYear, poster, review }) => {
  return (
    <div className="movie-card">
      <img className="movie-card__image" src={poster} alt={title} />
      <div className="movie-card__info">
        <h2 className="movie-card__title">Title: {title}</h2>
        <p className="movie-card__genre">Director: {director}</p>
        <p className="movie-card__release-year">Release Year: {releaseYear}</p>
        <p className="movie-card__review">Review:{review}</p>
      </div>
    </div>
  );
};

export default MovieCard;
