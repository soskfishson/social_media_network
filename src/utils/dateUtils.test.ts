import timeAgo from './dateUtils';

const secondsAgo = (n: number) => new Date(Date.now() - n * 1000);
const minutesAgo = (n: number) => secondsAgo(n * 60);
const hoursAgo = (n: number) => minutesAgo(n * 60);
const daysAgo = (n: number) => hoursAgo(n * 24);

describe('timeAgo — recent', () => {
    it('returns "Just now" for 0 seconds ago', () => {
        expect(timeAgo(new Date())).toBe('Just now');
    });

    it('returns "Just now" for 30 seconds ago', () => {
        expect(timeAgo(secondsAgo(30))).toBe('Just now');
    });

    it('returns "Just now" for future dates', () => {
        const future = new Date(Date.now() + 10000);
        expect(timeAgo(future)).toBe('Just now');
    });
});

describe('timeAgo — minutes', () => {
    it('returns "1 min ago" for 1 minute ago', () => {
        expect(timeAgo(minutesAgo(1))).toBe('1 min ago');
    });

    it('returns "5 min ago" for 5 minutes ago', () => {
        expect(timeAgo(minutesAgo(5))).toBe('5 min ago');
    });

    it('returns "59 min ago" for 59 minutes ago', () => {
        expect(timeAgo(minutesAgo(59))).toBe('59 min ago');
    });
});

describe('timeAgo — hours', () => {
    it('returns "1 hour ago" for 1 hour ago', () => {
        expect(timeAgo(hoursAgo(1))).toBe('1 hour ago');
    });

    it('returns plural "hours" for more than 1 hour', () => {
        expect(timeAgo(hoursAgo(5))).toBe('5 hours ago');
    });

    it('returns "23 hours ago" for 23 hours ago', () => {
        expect(timeAgo(hoursAgo(23))).toBe('23 hours ago');
    });
});

describe('timeAgo — days', () => {
    it('returns "1 day ago" for 1 day ago', () => {
        expect(timeAgo(daysAgo(1))).toBe('1 day ago');
    });

    it('returns plural "days" for more than 1 day', () => {
        expect(timeAgo(daysAgo(3))).toBe('3 days ago');
    });

    it('returns "6 days ago" for 6 days ago', () => {
        expect(timeAgo(daysAgo(6))).toBe('6 days ago');
    });
});

describe('timeAgo — formatted date', () => {
    it('returns formatted date string for 7+ days ago', () => {
        const result = timeAgo(daysAgo(7));
        expect(result).not.toContain('ago');
        expect(result).not.toBe('Just now');
    });

    it('returns formatted date for 30 days ago', () => {
        const result = timeAgo(daysAgo(30));
        expect(result).not.toContain('ago');
    });

    it('accepts number timestamp as input', () => {
        const ts = Date.now() - 2 * 60 * 1000;
        expect(timeAgo(ts)).toBe('2 min ago');
    });

    it('accepts string date as input', () => {
        const str = new Date(Date.now() - 3 * 60 * 1000).toISOString();
        expect(timeAgo(str)).toBe('3 min ago');
    });
});
