import { useState, useEffect } from 'react';
import timeAgo from '../utils/dateUtils';

const useTimeAgo = (dateString: string | Date | number) => {
    const [timeLabel, setTimeLabel] = useState(() => timeAgo(dateString));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLabel(timeAgo(dateString));
        }, 60000);

        return () => clearInterval(intervalId);
    }, [dateString]);

    return timeLabel;
};

export default useTimeAgo;