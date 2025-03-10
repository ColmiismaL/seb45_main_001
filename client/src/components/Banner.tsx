import axios from '../api/axios';
import {useEffect, useState} from 'react'
import requests from '../api/requests';
import {styled} from "styled-components";

const BannerLayout = styled.header`
* {
  box-sizing: content-box;
}
  color: white;
  object-fit: contain;
  height: 448px;
  margin-bottom: 10px;
  
  @media (min-width: 1500px) {
    position: relative;
    height: 600px;
  }
`;

const BannerContent = styled.div`
  margin-left: 40px;
  padding-top: 140px;
  height: 190px;

  @media (max-width: 768px) {
    width: min-content !important;
    padding-left: 2.3rem;
    margin-left: 0px !important;
  }
`;

const BannerTitle = styled.div`
  h1 {
    font-size: 3rem;
    font-weight: 800;
    padding-bottom: 0.5rem;
  }
`;

const BannerButtonBox = styled.div`
  display: flex;
  flex-direction: row;

  button {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    cursor: pointer;
    outline: none;
    border: none;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 0.2vw;
    padding: 0.4rem 1.8rem 0.4rem 1rem;
    margin-right: 1rem;
    background-color: white;
    color: black;
  }

  button:hover {
    color: #000;
    background-color: rgba(170, 170, 170, 0.9);
    transition: all 0.2s;
  }

  @media (max-width: 768px) {
    button {
      font-size: 0.8rem !important;
      border-radius: 4px !important;
    }
  }
`;

const BannerDescription = styled.div`
  h1 {
  width: 45rem;
  line-height: 1.3;
  padding-top: 1rem;
  font-weight: 500;
  font-size: 1rem;
  max-width: 400px;
  height: 80px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 0.8rem !important;
      width: auto !important;
    }
  }
`;

const BannerFade = styled.div`
  height: 7.4rem;
  background-image: linear-gradient(
  180deg,
  transparent,
  rgba(37, 37, 37, 0.61),
  #111
  );

  @media (min-width: 1500px) {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  //opacity: 0.65;
  border: none;
  frameborder="0"

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

interface Movie {
  backdrop_path: string;
  title?: string;
  name?: string;
  original_name?: string;
  overview: string;
  videos: {
    results: {
      key?: string;
    }[];
  };
}

const Banner = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = async () => {
    
    // 현재 상영중인 영화 정보를 가져오기(여러 영화)
    const request = await axios.get(requests.fetchNowPlaying);
    // 여러 영화 중 영화 하나의 ID를 가져오기
    const movieId = request.data.results[Math.floor(Math.random() * request.data.results.length)
    ].id;

    // 특정 영화의 더 상세한 정보 가져오기(비디오)
    const { data : movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos"},
    });
    setMovie(movieDetail);
    
  };

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  };
  
  

  if (!movie) {
    return null; 
  }

  console.log(movie);
  
  if (!isClicked) {
  return (
    <BannerLayout
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <BannerContent>
          <BannerTitle>
            <h1>
            {movie.title || movie.name || movie.original_name}
            </h1>
          </BannerTitle>

          <BannerButtonBox>
            { movie.videos && movie.videos.results.length > 0 ? (
            <button onClick={() => setIsClicked(true)}>
              Play
            </button>
          )  : null
          }
          </BannerButtonBox>

          <BannerDescription>
            <h1>
            {truncate(movie.overview, 100)}
            </h1>
          </BannerDescription>
        </BannerContent>
        <BannerFade />
      </BannerLayout>
    );
  } else {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=0&playlist=${movie.videos.results[0].key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  }
}
export default Banner;