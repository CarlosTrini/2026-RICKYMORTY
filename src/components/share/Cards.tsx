import type { Character } from "@/types/apiTypes";
import { Star, StarCheck } from "lucide-react";
import { Modal } from "../modal";
import { useModal } from "../modal/useModal";
import { favoritesStore } from "@/store/favoritesStores";
import Tooltip from "../tooltip/Tooltip";
import FallbackImage from "./FallbackImage";

export interface Props {
    character: Character;
}

const statusConfig = {
    Alive: {
        badge: "bg-primary/20 text-muted border-primary/50",
        dot: "bg-primary",
    },
    Dead: {
        badge: "bg-error/20 text-error border-error/50",
        dot: "bg-error",
    },
    unknown: {
        badge: "bg-muted/20 text-muted border-muted/50",
        dot: "bg-muted",
    },
};


const Cards = ({ character }: Props) => {

    // STATES
    const { isOpen, toggleModal } = useModal();

    // STORE
    const { checkIsFavorite, addFavorite, removeFavorite } = favoritesStore();


    // FUNCTIONS 
    const currentStatus = statusConfig[character.status] || statusConfig.unknown;
    const isFavorite = checkIsFavorite(character?.id);
    const tooltipMsg = isFavorite ? <span className="text-xs text-primary">Agregado a favoritos</span> : <span className="text-xs text-muted">Eliminado de favoritos</span>;


    return (
        <>
            <div
                className="bg-surface-hover rounded-lg p-2 md:min-w-60 max-w-70  xs:max-w-auto mx-auto shadow-sm shadow-muted hover:shadow-lg hover:shadow-primary transition-all duration-300"
                onClick={toggleModal}

            >
                <figure className="sm:min-w-55 sm:min-h-55 max-w-60 max-h-60 mx-auto rounded-lg overflow-hidden">
                    <FallbackImage src={character?.image} alt={character.name} className="w-full object-cover" />
                </figure>
                <div className="mt-2 flex justify-between">
                    <p className=" italic text-primary font-medium truncate max-w-[80%]">{character.name}</p>
                    <Tooltip
                        content={<span className="text-xs">{tooltipMsg}</span>}
                        trigger="click"
                        position="top"
                        autoclose
                        autoCloseTimer={500}
                        showCloseIcon={false}
                    >
                        <button
                            id='addFavoritesBtn'
                            className="cursor-pointer bg-surface hover:bg-surface-hover p-1.5 rounded-full shadow-sm shadow-muted hover:scale-90 transition-all duration-300"
                            onClick={() => {
                                isFavorite ? removeFavorite(character?.id) : addFavorite(character);
                            }}
                        >
                            {
                                isFavorite
                                    ? <StarCheck className={`w-4 h-4 text-accent fill-accent `} />
                                    : <Star className={`w-4 h-4 text-muted`} />
                            }
                        </button>
                    </Tooltip>
                </div>
            </div>

            <Modal
                isFullscreen={false}
                onClose={toggleModal}
                isOpen={isOpen}
                className="bg-surface max-w-70 rounded-md p-0"
            >
                <div className="mt-10">
                    <figure className="min-h-55 max-w-60 max-h-60 mx-auto ">
                        <FallbackImage src={character?.image} alt={character.name} className="w-full object-cover" />
                    </figure>
                    <div className="p-4 space-y-2.5">
                        <p className="text-accent italic font-bold text-center text-lg">{character.name}</p>

                        <div className="flex flex-wrap justify-evenly gap-3">
                            {/* ESTADO */}
                            <div className="flex items-center justify-between text-xs">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentStatus.badge}`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${currentStatus.dot}`} />
                                    Estado: {character?.status}
                                </span>
                            </div>
                            {/* GÉNERO */}
                            <div className="flex items-center justify-between text-xs">

                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/15 text-muted border border-secondary/40">
                                    Género:   {character?.gender}
                                </span>
                            </div>
                            {/* ESPECIE */}
                            <div className="flex items-center justify-between text-xs">

                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/15 text-muted border border-accent/40">
                                    Especie:        {character?.species}
                                </span>
                            </div>
                            {/* ORIGEN */}
                            <div className="flex items-center justify-between text-xs">

                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/40 text-muted border border-surface/20 max-w-36 truncate text-right" title={character?.origin?.name}>
                                    Origen: {character?.origin?.name}
                                </span>
                            </div>

                            {/* UBICACIÓN */}
                            <div className="flex items-center justify-between text-xs">

                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/30 text-muted border border-surface/20 max-w-36 truncate " title={character?.location?.name}>
                                    Ubicación:  {character?.location?.name}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

            </Modal>
        </>
    );
}

export default Cards;