import '@testing-library/jest-dom';
import { render, screen } from '../../../src/test-utils';
import Movie from './page';
import { useParams } from 'next/navigation';
import mockData from './movie-test-data.json';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

beforeAll(() => {
  useParams.mockReturnValue({ id: 552524 });
});

jest.mock('../../../src/utils/api', () => ({
  getDataFromApi: jest.fn(() => Promise.resolve(mockData)),
}));

describe('Movie component', () => {
  it('Renders <Movie /> component correctly', async () => {
    render(<Movie />);

    const image = await screen.findByAltText('Lilo & Stitch poster');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500//c32TsWLES7kL1uy6fF03V67AIYX.jpg');

    expect(screen.getByText(/Duration/i)).toBeInTheDocument();
    expect(screen.getByText(/Premiere/i)).toBeInTheDocument();
    expect(screen.getByText(/Budget/i)).toBeInTheDocument();
    expect(screen.getByText(/Gross worldwide/i)).toBeInTheDocument();
    expect(screen.getByText(/Genres/i)).toBeInTheDocument();

    expect(await screen.findByText(/Lilo & Stitch/i)).toBeVisible();
    expect(await screen.findByText(/7.3/i)).toBeVisible();
    expect(await screen.findByText(/995/i)).toBeVisible();
    expect(await screen.findByText(/1h 48m/i)).toBeVisible();
    expect(await screen.findByText(/May 17, 2025/i)).toBeVisible();
    expect(await screen.findByText(/\$100 000 000/i)).toBeVisible();
    expect(await screen.findByText(/\$1 008 843 338/i)).toBeVisible();
    expect(await screen.findByText(/Family, Science Fiction, Comedy, Adventure/i)).toBeVisible();

    expect(screen.getByText(/Trailer/i)).toBeInTheDocument();
    const iframe = screen.getByTitle('YouTube video player');
    expect(iframe).toHaveAttribute('src', `https://www.youtube.com/embed/VWqJifMMgZE`);

    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByText(/The wildly funny and touching story/i)).toBeInTheDocument();

    expect(screen.getByText(/Production/i)).toBeInTheDocument();
    expect(screen.getByText(/Walt Disney Pictures/i)).toBeInTheDocument();
    expect(screen.getByText(/Rideback/i)).toBeInTheDocument();
  });
});
