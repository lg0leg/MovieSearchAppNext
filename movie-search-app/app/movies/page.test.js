import '@testing-library/jest-dom';
import { render, screen, userEvent } from '../../src/test-utils';
import Movies from './page';

describe('Movies component', () => {
  it('Renders <Movies /> component correctly', async () => {
    render(<Movies />);
    expect(screen.getByRole('heading', { level: 1, name: /^Movies$/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Genres/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Genres/i })).toHaveAttribute('placeholder', 'Select genre');
    expect(screen.getByRole('textbox', { name: /Release year/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Release year/i })).toHaveAttribute(
      'placeholder',
      'Select release year'
    );
    expect(screen.getByRole('textbox', { name: /Ratings/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('From')).toHaveValue('');
    expect(screen.getByPlaceholderText('To')).toHaveValue('');
    expect(screen.getByRole('textbox', { name: /Sort by/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Sort by/i })).toHaveValue('Most popular');
    expect(screen.getByRole('button', { name: /Reset filters/i })).toBeInTheDocument();
  });

  it('Reset button works correctly', async () => {
    render(<Movies />);
    const sortSelect = screen.getByRole('textbox', { name: /Sort by/i });
    await userEvent.click(sortSelect);
    const titleOption = await screen.findByText('Title');
    await userEvent.click(titleOption);
    expect(sortSelect).toHaveValue('Title');
    await userEvent.click(screen.getByRole('button', { name: /Reset filters/i }));
    expect(sortSelect).toHaveValue('Most popular');
  });
});
