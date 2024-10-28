import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa"; // Importa os ícones de usuário e saída
import logoLindoDoMeuSite from '../../public/logoLindoDoMeuSite.png'; // Importe a imagem

export default function Header() {
    const [isLogged, setIsLogged] = useState(false);

    const handleLogin = () => {
        setIsLogged(!isLogged);
    }

    
    return (
        <>
            <header className="w-full h-10 flex justify-between items-center p-10 mb-1 bg-blue-300 bg-opacity-50">
                <div>
                    <img src={logoLindoDoMeuSite} alt="Logo React e Filmes " className="h-16 w-16" />
                </div>
                <nav>
                    <ul className="flex gap-5">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/movies">Filmes</NavLink></li>
                        <li><NavLink to="/genre">Gêneros</NavLink></li>
                        {/* <li><NavLink to="/favoritos">Favoritos</NavLink></li> */}
                        <li><NavLink to="/contato">Contato</NavLink></li>
                        {isLogged && <li><NavLink to="/settings">Settings</NavLink></li>}
                    </ul>
                </nav>
                <div onClick={handleLogin} className="cursor-pointer">
                    {isLogged ? <FaSignOutAlt className="text-white text-2xl" /> : <FaUser className="text-white text-2xl" />}
                </div>
            </header>
        </>
    )
}