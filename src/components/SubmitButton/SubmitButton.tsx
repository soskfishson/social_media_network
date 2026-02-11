import { Component } from 'react';
import type { ButtonHTMLAttributes } from 'react';
import './SubmitButton.css';

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

class SubmitButton extends Component<SubmitButtonProps> {
    render() {
        const { label, className, ...otherProps } = this.props;
        return (
            <button
                className={`submit-button ${className || ''}`}
                {...otherProps}
            >
                {label}
            </button>
        );
    }
}

export default SubmitButton;