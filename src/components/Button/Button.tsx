import { Component } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import { ButtonType } from '../../interfaces/interfaces.ts';
import './Button.css';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    label?: string;
    type?: ButtonType;
}

class Button extends Component<ButtonProps> {
    render() {
        const {
            label,
            className,
            type = ButtonType.SUBMIT,
            ...otherProps
        } = this.props;

        const isCloseButton = type === ButtonType.CLOSE;
        let baseClass: string;
        switch (type) {
            case ButtonType.SUBMIT:
                baseClass = 'submit-button';
                break;
            case ButtonType.CLOSE:
                baseClass = 'close-button-variant';
                break;
            default:
                baseClass = '';
        }
        const htmlType = isCloseButton ? 'button' : type;
        const displayLabel = label || (isCloseButton ? '×' : '');

        return (
            <button
                type={htmlType}
                className={`${baseClass} ${className || ''}`}
                {...otherProps}
            >
                {displayLabel}
            </button>
        );
    }
}

export default Button;