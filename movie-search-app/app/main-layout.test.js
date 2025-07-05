import '@testing-library/jest-dom';
import { render, screen } from '../src/test-utils';
import { MainLayout } from './main-layout';

describe('MainLayout component', () => {
  it('Renders <MainLayout /> component correctly', () => {
    render(<MainLayout />);
    expect(screen.getByText(/ArrowFlicks/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Movies$/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /^Rated movies$/i })).toBeInTheDocument();

    expect(screen.getAllByTestId('app-burger')).toHaveLength(2);
  });
});
