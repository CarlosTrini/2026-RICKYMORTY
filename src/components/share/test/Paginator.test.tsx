import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Paginator, { type PropsPagination } from '../Paginator';

// 1. Props base con valores por defecto válidos
const defaultProps: PropsPagination = {
    page: 1,
    pages: 10,
    hasPrev: false,
    hasNext: false,
    onPageChange: vi.fn(), // función espía simulada de Vitest
};

const renderPaginator = (extraProps: Partial<PropsPagination> = {}) => {
    return render(<Paginator {...defaultProps} {...extraProps} />);
};

describe('Componente <Paginator />', () => {
    // previos y first-page buttons
    it('No debe mostarar botón anterior si hasPrev es false', () => {
        renderPaginator();
        expect(screen.queryByRole('button', { name: 'previous-page' })).not.toBeInTheDocument();
    });

    it('No debe mostar botón ir a primera página si hasPrev es false', () => {
        renderPaginator();
        expect(screen.queryByRole('button', { name: 'first-page' })).not.toBeInTheDocument();
    });

    // next y last-page buttons
    it('No se debe mostrar el botón siguiente página si hasNext es false', () => {
        renderPaginator();
        expect(screen.queryByRole('button', { name: 'next-page' })).not.toBeInTheDocument();
    });

    it('No se debe mostar el botón última página si hasNext es false', () => {
        renderPaginator();
        expect(screen.queryByRole('button', { name: 'last-page' })).not.toBeInTheDocument();
    });


    it('onPageChange debe recibir un valor de tipo número al hacer clic', () => {
        const onPageChangeMock = vi.fn();


        renderPaginator({ onPageChange: onPageChangeMock });
        // Buscamos el botón de la página 2 y le hacemos clic
        const pageTwoButton = screen.getByRole('button', { name: '2' });
        fireEvent.click(pageTwoButton);
        // 1. Verificamos que la función fue llamada con cualquier número:
        expect(onPageChangeMock).toHaveBeenCalledWith(expect.any(Number));
        // 2. Y opcionalmente que fue el número 2:
        expect(onPageChangeMock).toHaveBeenCalledWith(2);
    });
});