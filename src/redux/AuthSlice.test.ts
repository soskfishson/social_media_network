import authReducer, {
    logout,
    loginThunk,
    registerThunk,
    getMeThunk,
    updateProfileThunk,
} from './AuthSlice';
import type { User } from '../interfaces/interfaces';

const mockUser: User = { id: 1, username: 'testuser', email: 'test@test.com' };
const mockToken = 'mock-access-token';

const loggedInState = {
    user: mockUser,
    accessToken: mockToken,
    isLoading: false,
    error: null,
};

const initialState = {
    user: null,
    accessToken: null,
    isLoading: false,
    error: null,
};

describe('AuthSlice — logout', () => {
    it('clears user and accessToken on logout', () => {
        const state = authReducer(loggedInState, logout());
        expect(state.user).toBeNull();
        expect(state.accessToken).toBeNull();
        expect(state.error).toBeNull();
    });

    it('removes accessToken and user from localStorage on logout', () => {
        localStorage.setItem('accessToken', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        authReducer(loggedInState, logout());
        expect(localStorage.getItem('accessToken')).toBeNull();
        expect(localStorage.getItem('user')).toBeNull();
    });

    it('is idempotent — logging out from already-logged-out state is safe', () => {
        const state = authReducer(initialState, logout());
        expect(state.user).toBeNull();
        expect(state.accessToken).toBeNull();
    });
});

describe('AuthSlice — loginThunk', () => {
    it('sets isLoading true on pending', () => {
        const action = { type: loginThunk.pending.type };
        const state = authReducer(initialState, action);
        expect(state.isLoading).toBe(true);
        expect(state.error).toBeNull();
    });

    it('stores token and user on fulfilled', () => {
        const payload = { token: mockToken, user: mockUser };
        const action = { type: loginThunk.fulfilled.type, payload };
        const state = authReducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.accessToken).toBe(mockToken);
        expect(state.user).toEqual(mockUser);
    });

    it('persists token and user to localStorage on fulfilled', () => {
        const payload = { token: mockToken, user: mockUser };
        const action = { type: loginThunk.fulfilled.type, payload };
        authReducer(initialState, action);
        expect(localStorage.getItem('accessToken')).toBe(mockToken);
        expect(JSON.parse(localStorage.getItem('user')!)).toEqual(mockUser);
    });

    it('sets error on rejected', () => {
        const action = { type: loginThunk.rejected.type, payload: 'Invalid credentials' };
        const state = authReducer(initialState, action);
        expect(state.isLoading).toBe(false);
        expect(state.error).toBe('Invalid credentials');
    });

    it('falls back to default error message on rejected without payload', () => {
        const action = { type: loginThunk.rejected.type, payload: undefined };
        const state = authReducer(initialState, action);
        expect(state.error).toBe('An error occurred');
    });
});

describe('AuthSlice — registerThunk', () => {
    it('sets isLoading true on pending', () => {
        const action = { type: registerThunk.pending.type };
        const state = authReducer(initialState, action);
        expect(state.isLoading).toBe(true);
    });

    it('stores token and user on fulfilled', () => {
        const payload = { token: mockToken, user: mockUser };
        const action = { type: registerThunk.fulfilled.type, payload };
        const state = authReducer(initialState, action);
        expect(state.accessToken).toBe(mockToken);
        expect(state.user).toEqual(mockUser);
    });

    it('sets error on rejected', () => {
        const action = { type: registerThunk.rejected.type, payload: 'Email already taken' };
        const state = authReducer(initialState, action);
        expect(state.error).toBe('Email already taken');
        expect(state.isLoading).toBe(false);
    });
});

describe('AuthSlice — getMeThunk', () => {
    it('sets isLoading true on pending', () => {
        const action = { type: getMeThunk.pending.type };
        const state = authReducer(initialState, action);
        expect(state.isLoading).toBe(true);
    });

    it('stores user on fulfilled', () => {
        const action = { type: getMeThunk.fulfilled.type, payload: mockUser };
        const state = authReducer(initialState, action);
        expect(state.user).toEqual(mockUser);
        expect(state.isLoading).toBe(false);
    });

    it('persists user to localStorage on fulfilled', () => {
        const action = { type: getMeThunk.fulfilled.type, payload: mockUser };
        authReducer(initialState, action);
        expect(JSON.parse(localStorage.getItem('user')!)).toEqual(mockUser);
    });

    it('clears auth state on rejected', () => {
        const action = { type: getMeThunk.rejected.type, payload: 'Session expired' };
        const state = authReducer(loggedInState, action);
        expect(state.user).toBeNull();
        expect(state.accessToken).toBeNull();
        expect(state.error).toBe('Session expired');
    });

    it('falls back to default message on rejected without payload', () => {
        const action = { type: getMeThunk.rejected.type, payload: undefined };
        const state = authReducer(loggedInState, action);
        expect(state.error).toBe('Session expired');
    });
});

describe('AuthSlice — updateProfileThunk', () => {
    it('sets isLoading true on pending', () => {
        const action = { type: updateProfileThunk.pending.type };
        const state = authReducer(initialState, action);
        expect(state.isLoading).toBe(true);
    });

    it('updates user on fulfilled', () => {
        const updatedUser = { ...mockUser, username: 'updated' };
        const action = { type: updateProfileThunk.fulfilled.type, payload: updatedUser };
        const state = authReducer(loggedInState, action);
        expect(state.user).toEqual(updatedUser);
        expect(state.isLoading).toBe(false);
    });

    it('persists updated user to localStorage on fulfilled', () => {
        const updatedUser = { ...mockUser, username: 'updated' };
        const action = { type: updateProfileThunk.fulfilled.type, payload: updatedUser };
        authReducer(loggedInState, action);
        expect(JSON.parse(localStorage.getItem('user')!)).toEqual(updatedUser);
    });

    it('sets isLoading false on rejected', () => {
        const action = { type: updateProfileThunk.rejected.type };
        const state = authReducer({ ...loggedInState, isLoading: true }, action);
        expect(state.isLoading).toBe(false);
    });
});
