import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

Object.defineProperty(global, 'TextEncoder', {
    writable: true,
    value: TextEncoder,
});

Object.defineProperty(global, 'TextDecoder', {
    writable: true,
    value: TextDecoder,
});

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: async () => [],
    }),
) as jest.Mock;

class MockIntersectionObserver {
    observe = jest.fn();
    disconnect = jest.fn();
    unobserve = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
});

const localStorageMock = (function () {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

jest.mock('../api/api');
jest.mock('../api/graphql');
