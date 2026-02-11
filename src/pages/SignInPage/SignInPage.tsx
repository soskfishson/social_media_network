import AuthLayout from '../../components/AuthLayout/AuthLayout.tsx';
import Input from '../../components/Input/Input.tsx';
import { InputType, ToastType, ValidationState } from '../../interfaces/interfaces.ts';
import EmailIcon from '../../assets/Email.svg?react';
import PasswordIcon from '../../assets/Eye.svg?react';
import SubmitButton from '../../components/SubmitButton/SubmitButton.tsx';
import { type SyntheticEvent, useReducer } from 'react';
import useToast from '../../hooks/useToast.ts';
import './SignInPage.css'
import useAuth from '../../hooks/useAuth.ts';

interface SignInState {
    email: string;
    password: string;
    isSubmitting: boolean;
    error: string | null;
}

enum ActionType {
    SET_EMAIL = 'SET_EMAIL',
    SET_PASSWORD = 'SET_PASSWORD',
    SUBMIT_START = 'SUBMIT_START',
    SUBMIT_SUCCESS = 'SUBMIT_SUCCESS',
    SUBMIT_ERROR = 'SUBMIT_ERROR',
    RESET = 'RESET',
}

interface SignUpAction {
    type: ActionType;
    payload?: string
}

const initialState: SignInState = {
    email: '',
    password: '',
    isSubmitting: false,
    error: null
};

const reducer = (state: SignInState, action: SignUpAction): SignInState => {
    switch (action.type) {
        case 'SET_EMAIL':
            if (!action.payload) {
                console.log('Email not provided');
                return {...state, email: ''};
            }
            return { ...state, email: action.payload, error: null };
        case 'SET_PASSWORD':
            if (!action.payload) {
                console.log('Password not provided');
                return {...state, password: ''};
            }
            return { ...state, password: action.payload, error: null };
        case 'SUBMIT_START':
            return { ...state, isSubmitting: true, error: null };
        case 'SUBMIT_SUCCESS':
            return { ...state, isSubmitting: false };
        case 'SUBMIT_ERROR':
            if (!action.payload) {
                console.log('Error not provided');
                return {...state}
            }
            return { ...state, isSubmitting: false, error: action.payload };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

const SignInPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { addToast } = useToast();
    const { login } = useAuth();

    const validateEmail = (email: string): ValidationState => {
        if (!email) return ValidationState.IDLE;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            return ValidationState.VALID;
        }
        return ValidationState.INVALID;
    };

    const validatePassword = (password: string): ValidationState => {
        if (!password) {
            return ValidationState.IDLE;
        }
        if (password.trim().length > 0) {
            return ValidationState.VALID;
        }
        return  ValidationState.INVALID;
    };

    const handleSubmit = async(e :SyntheticEvent) =>{
        e.preventDefault();

        const emailValidation = validateEmail(state.email);
        const passwordValidation = validatePassword(state.password);

        if (!state.email || !state.password) {
            dispatch({ type: ActionType.SUBMIT_ERROR, payload: 'Please fill in all fields' });
            addToast('Please fill in all fields', ToastType.ERROR);
            return;
        }

        if (emailValidation !== ValidationState.VALID) {
            addToast('Please enter a valid email address', ToastType.ERROR);
            return;
        }

        if (passwordValidation !== ValidationState.VALID) {
            addToast('Password must be at least 8 characters', ToastType.ERROR);
            return;
        }

        dispatch({ type: ActionType.SUBMIT_START });

        try {
            await login({ email: state.email, password: state.password });

            dispatch({ type: ActionType.SUBMIT_SUCCESS });
            addToast('Successfully signed in!', ToastType.SUCCESS);
        } catch (error) {
            dispatch({ type: ActionType.SUBMIT_ERROR, payload: 'Sign In failed. Please try again.' });
            addToast('Failed to sign into account. Please try again.', ToastType.ERROR);
            console.log(error);
        }
    }

    return (
        <AuthLayout title='Sign in into an account'
                    subtitle={'Enter your email and password \n' +
                    'to sign in into this app'}
                    bottomText="Forgot to create an account? "
                    bottomLink={{ text: 'Sign up', href: '/signup' }}>
            <form className="auth-form" onSubmit={handleSubmit}>
                <Input
                    type={InputType.EMAIL}
                    label="Email"
                    placeholder="Enter email"
                    value={state.email}
                    onChange={(value) => dispatch({ type: ActionType.SET_EMAIL, payload: value })}
                    validationState={validateEmail(state.email)}
                    errorMessage="Email is not valid"
                    icon={<EmailIcon />}
                    disabled={state.isSubmitting}
                />

                <Input
                    type={InputType.PASSWORD}
                    label="Password"
                    placeholder="Enter password"
                    value={state.password}
                    onChange={(value) => dispatch({ type: ActionType.SET_PASSWORD, payload: value })}
                    validationState={validatePassword(state.password)}
                    successMessage="Your password is correct"
                    errorMessage="Incorrect password"
                    icon={<PasswordIcon />}
                    disabled={state.isSubmitting}
                    showPasswordToggle={true}
                />

                <div className="auth-form-button-container">
                    <SubmitButton
                        label={state.isSubmitting ? 'Signing In...' : 'Sign In'}
                        disabled={state.isSubmitting}
                        type="submit"
                    />
                </div>
            </form>
        </AuthLayout>
    )
}

export default SignInPage;