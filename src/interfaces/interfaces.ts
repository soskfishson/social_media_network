import {type ReactNode} from 'react';

export interface User {
    name: string;
    surname: string;
    email: string;
    password: string;
    description: string;
    pfplink: string;
}

export interface Author {
    name: string;
    pfplink: string;
}

export interface PostData {
    id: number;
    author: Author;
    time: Date | string;
    content: string;
    image?: string;
    likes: number;
    comments: string[];
    isLiked: boolean;
}

export enum ErrorType {
    GENERIC = 'GENERIC',
    NOT_FOUND = 'NOT_FOUND',
}

export enum InputType {
    TEXT = 'TEXT',
    EMAIL = 'EMAIL',
    PASSWORD = 'PASSWORD',
    TEXTAREA = 'TEXTAREA',
    FILE = 'FILE',
}

export enum ValidationState {
    IDLE = 'IDLE',
    VALID = 'VALID',
    INVALID = 'INVALID'
}

export interface InputProps {
    type: InputType;
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    validationState?: ValidationState;
    errorMessage?: string;
    successMessage?: string;
    icon?: ReactNode;
    maxLength?: number;
    disabled?: boolean;
    backgroundColor?: string;
    showPasswordToggle?: boolean;
    accept?: string;
    onFileChange?: (value: File) => void;
}

export enum ToastType {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    WARNING = 'WARNING',
}

export interface IToast {
    id: string;
    type: ToastType;
    message: string;
}

export interface ToastContextType {
    toasts: IToast[];
    addToast: (message: string, type: ToastType) => void;
    removeToast: (id: string) => void;
}

export enum ThemeTypes {
    DARK = 'DARK',
    LIGHT = 'LIGHT',
}

export interface ThemeContextType {
    theme: ThemeTypes;
    toggleTheme: () => void;
    setTheme: (theme: ThemeTypes) => void;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    login: (data: LoginPayload) => Promise<void>;
    register: (data: RegisterPayload) => Promise<void>;
    logout: () => void;
}

export enum ButtonType {
    BUTTON = 'button',
    SUBMIT = 'submit',
    CLOSE = 'close',
}