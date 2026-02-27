import { renderHook, act } from '@testing-library/react';
import useTimeAgo from '../hooks/useTimeAgo';

describe('useTimeAgo — initial value', () => {
    it('returns the correct initial time label for a recent date', () => {
        const { result } = renderHook(() => useTimeAgo(new Date()));
        expect(result.current).toBe('Just now');
    });

    it('returns the correct initial label for minutes ago', () => {
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const { result } = renderHook(() => useTimeAgo(fiveMinutesAgo));
        expect(result.current).toBe('5 min ago');
    });

    it('returns the correct initial label for hours ago', () => {
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
        const { result } = renderHook(() => useTimeAgo(twoHoursAgo));
        expect(result.current).toBe('2 hours ago');
    });

    it('accepts ISO string date', () => {
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
        const { result } = renderHook(() => useTimeAgo(tenMinutesAgo));
        expect(result.current).toBe('10 min ago');
    });

    it('accepts numeric timestamp', () => {
        const ts = Date.now() - 3 * 60 * 1000;
        const { result } = renderHook(() => useTimeAgo(ts));
        expect(result.current).toBe('3 min ago');
    });
});

describe('useTimeAgo — interval updates', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('updates the label after 60 seconds', () => {
        const date = new Date(Date.now() - 59 * 1000);
        const { result } = renderHook(() => useTimeAgo(date));
        expect(result.current).toBe('Just now');

        act(() => {
            jest.advanceTimersByTime(60000);
        });

        expect(result.current).toBe('1 min ago');
    });

    it('clears the interval on unmount', () => {
        const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
        const { unmount } = renderHook(() => useTimeAgo(new Date()));
        unmount();
        expect(clearIntervalSpy).toHaveBeenCalled();
        clearIntervalSpy.mockRestore();
    });
});
