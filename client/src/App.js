
import axios from 'axios';
import './App.css';
import MovieCard from './Components/MovieCard';
import React, { useState } from 'react';
import {toast} from 'react-hot-toast';
const url = "http://localhost:5000"
const App = () => {
  const [rating, setRating] = useState(0);
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    releaseYear: '',
    poster: null,
    review: ''
  });

  const [moviesData, setMoviesData] = useState([]);
  const [selectedReview, setSelectedReview] = useState('');

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setMovie({ ...movie, [name]: value });
  // };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMovie({ ...movie, [name]: value });
  };

  const handlePosterChange = (event) => {
    setMovie({ ...movie, poster: event.target.files[0] });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', movie.title);
    formData.append('director', movie.director);
    formData.append('releaseYear', movie.releaseYear);
    formData.append('poster', movie.poster);
    formData.append('review', movie.review); 
    

    try {
      const res = await axios.post(`${url}/api/movies`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data)
      setMovie({ title: '',
      director: '',
      releaseYear: '',
      poster: null,
      review: '',
    }
      )
     
      toast.success("Movie Uploaded Successfully!")
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetMovies = async () => {
    try {
      const res = await axios.get(`${url}/api/movies`);
      setMoviesData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    {/* <div className='headd'>
      <div className='Heading'>Movie Bucket</div>
    </div> */}
    <div className='movie-form' >
    <h1>Movie Bucket</h1>
    {/* <img src="https://e1.pxfuel.com/desktop-wallpaper/510/266/desktop-wallpaper-netflix-netflix-app-good-movies-on-netflix-netflix-1213x2022-for-your-mobile-tablet.jpg" alt="sanju fault"></img> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={movie.title} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="director">Director:</label>
          <input type="text" id="director" name="director" value={movie.director} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="releaseYear">Release Year:</label>
          <input type="number" id="releaseYear" name="releaseYear" value={movie.releaseYear} onChange={handleInputChange} required />
        </div>
        <div>
          <label htmlFor="poster">Poster:</label>
          <input type="file" id="poster" name="poster" accept="image/*" onChange={handlePosterChange} required />
        </div>
        <div>
  <label htmlFor="review">Review:</label>
  <select
    id="review"
    name="review"
    value={movie.review}
    onChange={handleInputChange}
    required
  >
    <option value="">Select a Review</option>
    <option value="Good">Good</option>
    <option value="Great">Great</option>
    <option value="Terrible">Terrible</option>
  </select>
</div>
        



      <button type="submit">Upload Movie</button>
      </form>
      <button type='button' onClick={handleGetMovies}>Get Movies</button>
    </div>
    <div className="movie-list">
        {moviesData.map((movie) => (
          <MovieCard
            key={movie._id}
            title={movie.title}
            director={movie.director}
            releaseYear={movie.releaseYear}
            poster={movie.poster}
            review={movie.review}
          />
        ))}
      </div>
    </>
  );
};

export default App;


