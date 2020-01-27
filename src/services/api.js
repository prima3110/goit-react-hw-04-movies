import axios from 'axios';

const API_KEY = 'cf380a2ce3068970d21bfd680004dcc4';

export const getTrending = () => {
  return axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`,
  );
};

export const searchMovie = (searchQuery = '', page = 1) => {
  return axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=${page}`,
  );
};

export const getMovieDetails = id => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`,
  );
};

export const getMovieCredits = id => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`,
  );
};

export const getMovieReviews = (id, page = 1) => {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=${page}`,
  );
};
