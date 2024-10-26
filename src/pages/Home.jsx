import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import ContainerMovies from "../components/ContainerMovies";
import MovieCard from "../components/MovieCard";
import { FavoritesContext } from "../context/FavoritesContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [animationMovies, setAnimationMovies] = useState([]);
    const [scienceFictionMovies, setScienceFictionMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [topRatedSeries, setTopRatedSeries] = useState([]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    const { favorites, handleFavorite, isFavorite } = useContext(FavoritesContext);

    const API_KEY = '?api_key=7c572a9f5b3ba776080330d23bb76e1e';  
    const BASE_URL = 'https://api.themoviedb.org/3';
    
    const fetchMovies = async () => {
        try {
            const popularURL = `${BASE_URL}/movie/popular${API_KEY}&language=pt-br&page=1`;
            const animationURL = `${BASE_URL}/discover/movie${API_KEY}&language=pt-br&with_genres=16`;
            const scienceFictionURL = `${BASE_URL}/discover/movie${API_KEY}&language=pt-br&with_genres=878`;
            const upcomingURL = `${BASE_URL}/movie/upcoming${API_KEY}&language=pt-br&page=1`;
            const seriesURL = `${BASE_URL}/tv/popular${API_KEY}&language=pt-br&page=1`;
            const trendingURL = `${BASE_URL}/trending/movie/week${API_KEY}&language=pt-br`;
            const topRatedSeriesURL = `${BASE_URL}/tv/top_rated${API_KEY}&language=pt-br&page=1`;
            const nowPlayingURL = `${BASE_URL}/movie/now_playing${API_KEY}&language=pt-br&page=1`;

            const [popularResponse, animationResponse, scienceFictionResponse, upcomingResponse, seriesResponse, trendingResponse, topRatedSeriesResponse, nowPlayingResponse] = await Promise.all([
                fetch(popularURL),
                fetch(animationURL),
                fetch(scienceFictionURL),
                fetch(upcomingURL),
                fetch(seriesURL),
                fetch(trendingURL),
                fetch(topRatedSeriesURL),
                fetch(nowPlayingURL)
            ]);

            const popularData = await popularResponse.json();
            const animationData = await animationResponse.json();
            const scienceFictionData = await scienceFictionResponse.json();
            const upcomingData = await upcomingResponse.json();
            const seriesData = await seriesResponse.json();
            const trendingData = await trendingResponse.json();
            const topRatedSeriesData = await topRatedSeriesResponse.json();
            const nowPlayingData = await nowPlayingResponse.json();

            setPopularMovies(popularData.results);
            setAnimationMovies(animationData.results);
            setScienceFictionMovies(scienceFictionData.results);
            setUpcomingMovies(upcomingData.results);
            setSeries(seriesData.results);
            setTrendingMovies(trendingData.results);
            setTopRatedSeries(topRatedSeriesData.results);
            setNowPlayingMovies(nowPlayingData.results);
        } catch (error) {
            console.error('Erro ao buscar os filmes:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchMovies();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <>
            {loading ? <p>Carregando...</p> :
                <>
                    <div className="w-full h-2/4">
                        <Slider {...settings}>
                            {trendingMovies.map(movie => (
                                <div key={movie.id} className="w-full h-auto">
                                    <img className="w-full h-80 object-cover" src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <ContainerMovies titulo="Filmes em Alta">
                        {trendingMovies.map(movie => (
                            <MovieCard
                                key={movie.id} {...movie}
                                handleFavorite={handleFavorite}
                                isFavorite={isFavorite(movie)} />
                        ))}
                    </ContainerMovies>
                    <ContainerMovies titulo="Séries Melhor avaliadas " >
                        {topRatedSeries.map(serie => (
                            <MovieCard
                                key={serie.id} {...serie}
                                handleFavorite={handleFavorite}
                                isFavorite={isFavorite(serie)} />
                        ))}
                    </ContainerMovies>
                    <ContainerMovies titulo="Em cartaz no cinema" >
                        {nowPlayingMovies.map(movie => (
                            <MovieCard
                                key={movie.id} {...movie}
                                handleFavorite={handleFavorite}
                                isFavorite={isFavorite(movie)} />
                        ))}
                    </ContainerMovies>
                </>
            }
        </>
    )
}