import Cards from "@/components/share/Cards";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { favoritesStore } from '@/store/favoritesStores';
import EmptyData from "@/components/share/EmptyData";


const Favorites = () => {

    // STATES


    // ZUSTAND
    const { favoritesList } = favoritesStore();


    return (
        <>
            <div className="max-w-7xl mx-auto mt-2">

                <Link
                    to="/"
                    className="w-fit flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 text-xs font-medium transition-all"
                >
                    <Home className="w-4 h-4 text-accent" />
                    <span>Inicio</span>
                </Link>
            </div>
            <div className="max-w-xl md:max-w-5xl mx-auto text-center mt-5">
                <h1 className="text-primary text-3xl font-bold">Mis favoritos</h1>
                <p className="text-muted mt-3 ">Base de datos de personajes de <strong>Rick y Morty</strong></p>
            </div>
            {
                favoritesList.length > 0
                    ? (
                        <div className="max-w-xl md:max-w-5xl mx-auto my-10 grid gap-3 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between">
                            {
                                favoritesList.map((c) => < Cards key={c.id} character={c} />)
                            }
                        </div>

                    )
                    : (


                        <EmptyData
                            title="Aún no hay favoritos agregados"
                            subtitle="Explora los personajes y presiona la estrella para agregarlos a tu lista."
                            goTo="/"
                        />
                    )
            }
        </>
    );
}

export default Favorites;