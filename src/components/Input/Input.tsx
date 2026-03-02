import { type ChangeEvent, useState } from 'react';
import {
    ButtonType,
    type InputProps,
    InputType,
    ValidationState,
} from '../../interfaces/interfaces.ts';
import InfoIcon from '../../assets/InfoIcon.svg?react';
import InfoIconError from '../../assets/InfoIconError.svg?react';
import ShowPassword from '../../assets/ShowPassword.svg?react';
import HidePassword from '../../assets/HidePassword.svg?react';
import SuccessIcon from '../../assets/Success.svg?react';
import FileIcon from '../../assets/File.svg?react';
import './Input.css';
import Button from '../Button/Button.tsx';

const Input = ({
    type,
    label,
    placeholder,
    value,
    onChange,
    validationState = ValidationState.IDLE,
    errorMessage,
    successMessage,
    icon,
    maxLength,
    disabled = false,
    backgroundColor = 'var(--input-bg)',
    showPasswordToggle = true,
    accept,
    onFileChange,
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [fileName, setFileName] = useState<string>('');
    const charCount = value.length;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(e.target.value);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onFileChange) {
            setFileName(file.name);
            onFileChange(file);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const getInputType = () => {
        if (type === InputType.PASSWORD && showPasswordToggle) {
            if (showPassword) {
                return 'text';
            }
            return 'password';
        }
        if (type === InputType.TEXTAREA || type === InputType.FILE) {
            return undefined;
        }
        return type;
    };

    const getStateStyle = () => {
        if (validationState === ValidationState.VALID) {
            return 'input-valid';
        }
        if (validationState === ValidationState.INVALID) {
            return 'input-invalid';
        }
        return '';
    };

    const isOverLimit = type === InputType.TEXTAREA && maxLength && charCount > maxLength;

    if (type === InputType.FILE) {
        return (
            <div className="input-wrapper">
                {label && (
                    <label className="input-label">
                        {icon && <span className="input-label-icon">{icon}</span>}
                        {label}
                    </label>
                )}

                <label
                    htmlFor={`file-input-${label}`}
                    className={`file-upload-area ${disabled ? 'file-upload-disabled' : ''}`}
                    style={{ backgroundColor }}
                >
                    <input
                        id={`file-input-${label}`}
                        type="file"
                        className="file-upload-input"
                        onChange={handleFileChange}
                        disabled={disabled}
                        accept={accept}
                    />
                    <div className="file-upload-content">
                        <FileIcon className="file-upload-icon" />
                        <div className="file-upload-text-area">
                            <span className="file-upload-text">
                                {fileName || placeholder || 'Select a file or drag and drop here'}
                            </span>
                            <span className="file-upload-hint">
                                {accept
                                    ? `${accept.replace(/\./g, '').toUpperCase()}, file size no more than 10MB`
                                    : 'File size no more than 10MB'}
                            </span>
                        </div>
                    </div>
                </label>

                {validationState === ValidationState.INVALID && errorMessage && (
                    <div className="input-message input-message-error">
                        <span className="input-message-icon">
                            <InfoIconError />
                        </span>
                        {errorMessage}
                        <Button type={ButtonType.BUTTON} className="input-message-info">
                            <InfoIcon />
                        </Button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="input-wrapper">
            <label className="input-label">
                <span className="input-label-container">
                    <span className="input-label-icon">{icon}</span>
                    {label}
                </span>
                {validationState === ValidationState.VALID && (
                    <span className="input-check-icon">✓</span>
                )}
            </label>

            <div className={`input-container ${getStateStyle()}`}>
                {type === InputType.TEXTAREA ? (
                    <textarea
                        className="input-field input-textarea"
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        disabled={disabled}
                        maxLength={maxLength}
                        style={{ backgroundColor }}
                    />
                ) : (
                    <input
                        type={getInputType()}
                        className="input-field"
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        disabled={disabled}
                        style={{ backgroundColor }}
                    />
                )}

                <div className="input-icons">
                    {type === InputType.PASSWORD && showPasswordToggle && (
                        <Button
                            type={ButtonType.BUTTON}
                            className="input-password-toggle"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <HidePassword /> : <ShowPassword />}
                        </Button>
                    )}
                </div>
            </div>

            {validationState === ValidationState.VALID && successMessage && (
                <div className="input-message input-message-success">
                    <span className="input-message-icon">
                        <SuccessIcon />
                    </span>
                    {successMessage}
                </div>
            )}

            {validationState === ValidationState.INVALID && errorMessage && (
                <div className="input-message input-message-error">
                    <span className="input-message-icon">
                        <InfoIconError />
                    </span>
                    {errorMessage}
                    <Button type={ButtonType.BUTTON} className="input-message-info">
                        <InfoIcon />
                    </Button>
                </div>
            )}

            {type === InputType.TEXTAREA && maxLength && (
                <div className={`input-char-count ${isOverLimit ? 'input-char-count-error' : ''}`}>
                    <span className="input-char-count-icon">
                        <InfoIcon />
                    </span>
                    Max {maxLength} texts
                </div>
            )}
        </div>
    );
};

export default Input;
