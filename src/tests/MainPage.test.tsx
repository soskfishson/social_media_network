import { renderWithProviders, screen, waitFor } from './test-utils';
import MainPage from '../pages/MainPage/MainPage';
import { fetchPostsGraphQL as mockFetch } from '../api/graphql';

const mockPosts = [
    {
        id: 1,
        title: 'First Post',
        content: 'Content 1',
        authorId: 1,
        likedByUsers: [],
        creationDate: new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
        likesCount: 0,
        commentsCount: 0,
        authorPhoto: '',
    },
    {
        id: 2,
        title: 'Second Post',
        content: 'Content 2',
        authorId: 2,
        likedByUsers: [],
        creationDate: new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
        likesCount: 0,
        commentsCount: 0,
        authorPhoto: '',
    },
];

describe('MainPage — loading state', () => {
    it('shows skeleton loaders while data is pending', () => {
        (mockFetch as jest.Mock).mockReturnValue(new Promise(() => {}));
        renderWithProviders(<MainPage />);
        expect(screen.getByTestId('main-loader')).toBeInTheDocument();
    });

    it('hides skeleton loaders after data resolves', async () => {
        (mockFetch as jest.Mock).mockResolvedValue(mockPosts);
        renderWithProviders(<MainPage />);
        await waitFor(() => {
            expect(screen.queryByTestId('main-loader')).not.toBeInTheDocument();
        });
    });
});

describe('MainPage — data states', () => {
    it('shows empty state message when no posts exist', async () => {
        (mockFetch as jest.Mock).mockResolvedValue([]);
        renderWithProviders(<MainPage />);
        await waitFor(() => {
            expect(screen.getByText(/No posts to show yet/i)).toBeInTheDocument();
        });
    });

    it('renders posts when data is available', async () => {
        (mockFetch as jest.Mock).mockResolvedValue(mockPosts);
        renderWithProviders(<MainPage />);
        await waitFor(() => {
            expect(screen.getByText(/First Post/)).toBeInTheDocument();
            expect(screen.getByText(/Second Post/)).toBeInTheDocument();
        });
    });

    it('renders error message when API fails', async () => {
        (mockFetch as jest.Mock).mockRejectedValue(new Error('Network Error'));
        renderWithProviders(<MainPage />);
        await waitFor(() => {
            expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
        });
    });

    it('does not show empty state when there is an error', async () => {
        (mockFetch as jest.Mock).mockRejectedValue(new Error('Fail'));
        renderWithProviders(<MainPage />);
        await waitFor(() => {
            expect(screen.queryByText(/No posts to show yet/i)).not.toBeInTheDocument();
        });
    });
});

describe('MainPage — authentication-based rendering', () => {
    it('renders sidebar when user is logged in', () => {
        (mockFetch as jest.Mock).mockReturnValue(new Promise(() => {}));
        renderWithProviders(<MainPage />, { authValue: { isLoggedIn: true } });
        expect(screen.getByRole('complementary')).toBeInTheDocument();
    });

    it('does not render sidebar when user is not logged in', () => {
        (mockFetch as jest.Mock).mockReturnValue(new Promise(() => {}));
        renderWithProviders(<MainPage />, { authValue: { isLoggedIn: false } });
        expect(screen.queryByRole('complementary')).not.toBeInTheDocument();
    });

    it('renders CreatePostForm when logged in', () => {
        (mockFetch as jest.Mock).mockReturnValue(new Promise(() => {}));
        renderWithProviders(<MainPage />, { authValue: { isLoggedIn: true } });
        expect(screen.getByPlaceholderText(/What's happening/i)).toBeInTheDocument();
    });

    it('does not render CreatePostForm when logged out', () => {
        (mockFetch as jest.Mock).mockReturnValue(new Promise(() => {}));
        renderWithProviders(<MainPage />, { authValue: { isLoggedIn: false, user: null } });
        expect(screen.queryByPlaceholderText(/What's happening/i)).not.toBeInTheDocument();
    });
});

describe('MainPage — layout', () => {
    it('always renders the Header', () => {
        (mockFetch as jest.Mock).mockReturnValue(new Promise(() => {}));
        renderWithProviders(<MainPage />);
        expect(document.querySelector('.header')).toBeInTheDocument();
    });

    it('always renders the Footer', () => {
        (mockFetch as jest.Mock).mockReturnValue(new Promise(() => {}));
        renderWithProviders(<MainPage />);
        expect(screen.getByText(/© 2026 Sidekick/i)).toBeInTheDocument();
    });
});
