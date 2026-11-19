import { useMemo, useState } from "react";
import { apiService } from "@/services/apiService";
import type { Character } from "@/types/apiTypes";
import { useQuery } from "@tanstack/react-query";
import Fallback from "@/components/fallbackQuery/Fallback";
import Cards from "@/components/share/Cards";
import { Search, X } from "lucide-react";
import EmptyData from "@/components/share/EmptyData";
import Paginator from "@/components/share/Paginator";
import { useSearchParams } from "react-router-dom";


const Home = () => {

    //HOOKS
    const [searchParams, setSearchParams] = useSearchParams();

    // STATES
    const [page, setPage] = useState<number>(Number(searchParams.get('page')) || 1);
    const [searchName, setSearchName] = useState<string>(searchParams.get('name') || '');


    // QUERY
    const { data: dataCharacters, isLoading, error } = useQuery({
        queryKey: ['character-home', page],
        queryFn: () => apiService.getCharacters(page),
        placeholderData: (previousData) => previousData
    });


    // FUNCTIONS

    const filteredCharacters: Character[] = useMemo(() => {
        const list = dataCharacters?.results ?? [];
        if (!searchName.trim()) return list; // Si el input está vacío, muestra todos automáticamente

        return list.filter((character) =>
            character.name.toLowerCase().includes(searchName.toLowerCase().trim())
        );
    }, [dataCharacters?.results, searchName]);

    const handleSearchInput = (text: string) => {
        setSearchName(text);
        setSearchParams(prev => {
            text.trim() !== '' ? prev.set('name', text) : prev.delete('name');
            return prev;
        });

    }


    return (
        <>
            {/* TITULO PAGINA */}
            <div className="max-w-xl md:max-w-5xl mx-auto text-center mt-10">
                <h1 className="text-primary text-3xl font-bold">Wubba lubba dub dub!</h1>
                <p className="text-muted mt-3 ">Base de datos de personajes de <strong>Rick y Morty</strong></p>
            </div>

            <Fallback
                data={dataCharacters}
                isError={error}
                isLoading={isLoading}
                id="fallback-characters-home"
                errorClassName="mt-50"
                loadingClassName="mt-50"
            >

                <main className="min-h-[70vh] relative pb-10 mb-10">


                    {/* INPUT FILTER */}
                    <div className="max-w-xl md:max-w-5xl mx-auto">
                        <div className="mt-10 bg-foreground w-fit flex items-center rounded-lg p-2 gap-2">
                            <Search className="text-surface" />
                            <input
                                type="text"
                                placeholder="Buscar"
                                value={searchName}
                                className=" text-surface placeholder:text-surface-hover font-bold italic focus:outline-none"
                                onChange={(e) => {
                                    const text = e.target.value;
                                    handleSearchInput(text);

                                }}
                            />
                            {searchName && (
                                <button
                                    type="button"
                                    onClick={() => handleSearchInput('')}
                                    className="p-1 hover:bg-error/30 rounded-full"
                                >
                                    <X className=" w-3 h-3 text-error " />
                                </button>
                            )}

                        </div>

                    </div>

                    {/* CARDS CHARACTERS */}
                    {
                        filteredCharacters?.length > 0
                            ? (
                                <div className="px-3 max-w-xl md:max-w-5xl mx-auto my-7 grid gap-3 md:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-between">
                                    {filteredCharacters.map((c) => <Cards key={c.id} character={c} />)}
                                </div>
                            )
                            : (
                                <div className="mt-20">
                                    <EmptyData title="No se encontraron coincidencias" />

                                </div>
                            )
                    }

                    {/* PAGINADOR */}
                    {
                        filteredCharacters.length > 0 && (
                            <div className="absolute bottom-0 w-full" key={'pagination-home'}>
                                <Paginator
                                    onPageChange={(page) => {
                                        setPage(page);
                                        setSearchParams(prev => {
                                            page == 1 ? prev.delete('page') : prev.set('page', page.toString());
                                            return prev;
                                        });
                                    }}
                                    page={page}
                                    hasNext={Boolean(dataCharacters?.info.next)}
                                    hasPrev={Boolean(dataCharacters?.info.prev)}
                                    pages={dataCharacters?.info.pages || 0}
                                />
                            </div>

                        )
                    }
                </main>
            </Fallback>
        </>
    );
}

export default Home;