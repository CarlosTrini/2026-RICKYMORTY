import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import EmptyData from '../EmptyData';

describe('Componente <EmptyData />', () => {
  // Test 1: Renderizado básico del título
  it('debe mostrar el título que recibe por props', () => {
    render(<EmptyData title="No se encontraron personajes" />);

    // Verificamos que el texto esté visible en la pantalla
    const titleElement = screen.getByText('No se encontraron personajes');
    expect(titleElement).toBeInTheDocument();
  });

  // Test 2: Comportamiento condicional (subtítulo)
  it('debe mostrar el subtítulo solo si se le envía', () => {
    const { rerender } = render(
      <EmptyData title="Vacío" subtitle="Intenta con otro término de búsqueda" />
    );

    expect(
      screen.getByText('Intenta con otro término de búsqueda')
    ).toBeInTheDocument();

    // Si volvemos a renderizar sin subtítulo, no debe aparecer
    rerender(<EmptyData title="Vacío" />);
    expect(
      screen.queryByText('Intenta con otro término de búsqueda')
    ).not.toBeInTheDocument();
  });

  // Test 3: Enlace de navegación condicional
  it('debe mostrar el botón de explorar cuando se pasa la prop goTo', () => {
    render(
      <MemoryRouter>
        <EmptyData title="Sin favoritos" goTo="/" />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link', { name: /explorar/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/');
  });
});
