import '@testing-library/jest-dom';
import { render, screen, userEvent } from '../../src/test-utils';
import RatedMovies from './page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

beforeEach(() => {
  useRouter.mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
  });
});

describe('Rated movies component', () => {
  it('Renders <Rated movies /> component correctly', async () => {
    render(<RatedMovies />);

    const image = screen.getByRole('img');
    expect(image.getAttribute('src')).toContain('loading');
    expect(await screen.findByText(/You haven't rated any films yet/i)).toBeVisible();
    expect(await screen.findByRole('button', { name: /Find movies/i })).toBeVisible();
  });
});
