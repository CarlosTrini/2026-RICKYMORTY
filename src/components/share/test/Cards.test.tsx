import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Cards, { type Props } from "../Cards";
import type { Character } from "@/types/apiTypes";

const characterDefault: Character = {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
        name: "Earth (C-137)",
        url: "https://rickandmortyapi.com/api/location/1",
    },
    location: {
        name: "Citadel of Ricks",
        url: "https://rickandmortyapi.com/api/location/3",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2",
    ],
    url: "https://rickandmortyapi.com/api/character/1",
    created: "2017-11-04T18:48:46.250Z",
};

const renderCards = (extraProps: Partial<Props> = {}) => {
    return render(<Cards character={characterDefault} {...extraProps} />);
};

describe('Componente <Cards />', () => {
    // 1. Renderizado básico
    it('debe mostrar el nombre del personaje', () => {
        renderCards();
        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    });

    // 2. Imagen con atributos src y alt
    it('debe mostrar la imagen del personaje con src y alt correctos', () => {
        renderCards();
        const images = screen.getAllByRole('img', { name: 'Rick Sanchez' });
        expect(images[0]).toBeInTheDocument();
        expect(images[0]).toHaveAttribute('src', characterDefault.image);
    });


    // 3. Modal (Interacción de usuario)
    it('debe abrir el modal con los detalles al hacer clic en la tarjeta', () => {
        renderCards();

        // Al inicio el detalle de origen no está en pantalla
        expect(screen.queryByText(/Earth \(C-137\)/i)).not.toBeInTheDocument();

        // Hacemos clic en el nombre para abrir el modal
        fireEvent.click(screen.getByText('Rick Sanchez'));

        // Ahora los datos del modal deben estar visibles
        expect(screen.getByText(/Earth \(C-137\)/i)).toBeInTheDocument();
        expect(screen.getByText(/Estado:\s*Alive/i)).toBeInTheDocument();
    });
});
