import '@testing-library/jest-dom';
import { render, screen } from '../src/test-utils';
import NotFoundPage from './not-found';

jest.mock('next/router', () => require('next-router-mock'));

describe('NotFoundPage component', () => {
  it('Renders <NotFoundPage /> component correctly', () => {
    render(<NotFoundPage />);
    const image = screen.getByRole('img');
    expect(image.getAttribute('src')).toContain('404');
    expect(screen.getByText(/We can’t find the page you are looking for/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go home/i })).toBeInTheDocument();
  });
});
