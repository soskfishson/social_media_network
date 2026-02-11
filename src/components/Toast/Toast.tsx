import { type IToast, ToastType } from '../../interfaces/interfaces.ts';
import './Toast.css';

interface ToastProps {
    toast: IToast;
    onRemove: (id: string) => void;
}

const Toast = ({ toast, onRemove }: ToastProps) => {
    const getToastClass = () => {
        switch (toast.type) {
            case ToastType.SUCCESS:
                return 'toast-success';
            case ToastType.ERROR:
                return 'toast-error';
            case ToastType.WARNING:
                return 'toast-warning';
            default:
                return '';
        }
    };

    return (
        <div className={`toast ${getToastClass()}`}>
            <span className="toast-message">{toast.message}</span>
            <button
                className="toast-close"
                onClick={() => onRemove(toast.id)}
                aria-label="Close"
            >
                ✕
            </button>
        </div>
    );
};

export default Toast;