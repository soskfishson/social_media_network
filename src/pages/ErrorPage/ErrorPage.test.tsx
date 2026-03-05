import { renderWithProviders, screen } from '../../tests/test-utils';
import ErrorPage from './ErrorPage';
import { ErrorType } from '../../interfaces/interfaces';

describe('ErrorPage — NOT_FOUND', () => {
    it('renders Page not found message', () => {
        renderWithProviders(<ErrorPage error={ErrorType.NOT_FOUND} />);
        expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
    });

    it('renders error-message element for NOT_FOUND', () => {
        renderWithProviders(<ErrorPage error={ErrorType.NOT_FOUND} />);
        expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
});

describe('ErrorPage — GENERIC', () => {
    it('renders generic error message', () => {
        renderWithProviders(<ErrorPage error={ErrorType.GENERIC} />);
        expect(screen.getByText(/Something bad has just happened/i)).toBeInTheDocument();
    });

    it('renders error-message element for GENERIC', () => {
        renderWithProviders(<ErrorPage error={ErrorType.GENERIC} />);
        expect(screen.getByTestId('error-message')).toBeInTheDocument();
    });
});

describe('ErrorPage — layout', () => {
    it('renders the header in simple variant', () => {
        renderWithProviders(<ErrorPage error={ErrorType.NOT_FOUND} />);
        expect(document.querySelector('.header-simple')).toBeInTheDocument();
    });

    it('renders the footer', () => {
        renderWithProviders(<ErrorPage error={ErrorType.GENERIC} />);
        expect(screen.getByText(/© 2026 Sidekick/i)).toBeInTheDocument();
    });

    it('renders the error page container', () => {
        renderWithProviders(<ErrorPage error={ErrorType.NOT_FOUND} />);
        expect(document.querySelector('.error-page')).toBeInTheDocument();
    });
});
