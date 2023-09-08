import axios from "axios";

const instance = axios.create({
  
  baseURL: "https://api.themoviedb.org/3",
  // process.env.REACT_APP_KMDB_API
  params: {
    api_key : "8175a9f719dad326e765f9f4364409be",
    language: "ko-KR",
  },
});

export default instance;