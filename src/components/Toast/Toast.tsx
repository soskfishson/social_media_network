import { ButtonType, type IToast, ToastType } from '../../interfaces/interfaces';
import Button from '../Button/Button';
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
        <div className={`toast ${getToastClass()}`} data-testid="toast-item">
            <span className="toast-message">{toast.message}</span>
            <Button
                type={ButtonType.CLOSE}
                className="toast-close"
                onClick={() => onRemove(toast.id)}
            >
                ✕
            </Button>
        </div>
    );
};

export default Toast;
