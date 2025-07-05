import '@testing-library/jest-dom';
import { render, screen, userEvent } from '../../../src/test-utils';
import NoAccessAlert from './alert';

describe('NoAccessAlert component', () => {
  it('Renders <NoAccessAlert /> component correctly', async () => {
    render(<NoAccessAlert />);
    expect(screen.getByText(/Сервис TMDB может быть недоступен в некоторых регионах/i)).toBeInTheDocument();
    expect(screen.getByTestId('no-acc-alert')).toBeInTheDocument();
    expect(screen.getByTestId('no-acc-alert')).toBeVisible();
    expect(localStorage.getItem('visibleAlertLS')).toBeNull();

    await userEvent.click(screen.getByTestId('hide-alert'));

    expect(screen.getByTestId('no-acc-alert')).not.toBeVisible();
    expect(localStorage.getItem('visibleAlertLS')).toBe('hidden');
  });
});
