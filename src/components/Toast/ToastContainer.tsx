import { type IToast } from '../../interfaces/interfaces.ts';
import Toast from './Toast';
import './Toast.css';

interface ToastContainerProps {
    toasts: IToast[];
    onRemove: (id: string) => void;
}

const ToastContainer = ({ toasts, onRemove }: ToastContainerProps) => {
    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <Toast key={toast.id} toast={toast} onRemove={onRemove} />
            ))}
        </div>
    );
};

export default ToastContainer;