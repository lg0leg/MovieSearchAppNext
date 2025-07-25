import '@testing-library/jest-dom';
import { render, screen, userEvent } from '../src/test-utils';
import { MainLayout } from './main-layout';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('MainLayout component', () => {
  it('Renders <MainLayout /> component correctly', () => {
    render(<MainLayout />);
    expect(screen.getByText(/ArrowFlicks/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Movies$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Rated movies$/i })).toBeInTheDocument();

    expect(screen.getAllByTestId('app-burger')).toHaveLength(2);
  });

  it('Router works correctly', async () => {
    usePathname.mockReturnValue('/movies');
    const { rerender } = render(<MainLayout />);

    const moviesLink = screen.getByTestId('movies-link');
    const ratedMoviesLink = screen.getByTestId('rated-movies-link');

    expect(moviesLink).toHaveClass('nav-item active');
    expect(ratedMoviesLink.classList).not.toContain('active');

    await userEvent.click(ratedMoviesLink);
    usePathname.mockReturnValue('/rated-movies');
    rerender(<MainLayout />);

    expect(screen.getByTestId('movies-link')).not.toHaveClass('active');
    expect(screen.getByTestId('rated-movies-link')).toHaveClass('active');

    usePathname.mockReturnValue('/movies');
    await userEvent.click(screen.getByTestId('logo-link'));
    rerender(<MainLayout />);

    expect(moviesLink).toHaveClass('active');
    expect(ratedMoviesLink).not.toHaveClass('active');
  });
});
