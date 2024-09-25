import movies from "../data/movies.json"
import MovieCard from "../components/MovieCard"
import { useState } from "react"

export default function MovieListPage() {

    const [search, setSearch] = useState('')
    const [listaFilmes, setListaFilmes] = useState(movies)

    const handleSearch = (e) => {
        setSearch(e.target.value)
        
        setListaFilmes(filmesFiltrados)
}
    return (
        <>
            <h2>Veja a lista completa de filmes</h2>
            <input
                className="text-black"
                type="text"
                name="search"
                id="search"
                value={search}
                onChange={handleSearch}
            />

            <div className="flex">
                {
                    listaFilmes
                        .filter(filme => (filme.titulo).includes(search).toLowerCase)
                        .map(filme => (
                            <MovieCard key={filme.id} {...filme} />
                        ))
                }
            </div>
        </>
    )

}

