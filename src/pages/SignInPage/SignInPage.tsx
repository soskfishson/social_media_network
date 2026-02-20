import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout/AuthLayout.tsx';
import Input from '../../components/Input/Input.tsx';
import Button from '../../components/Button/Button.tsx';
import EmailIcon from '../../assets/Email.svg?react';
import PasswordIcon from '../../assets/Eye.svg?react';
import useToast from '../../hooks/useToast.ts';
import useAuth from '../../hooks/useAuth.ts';
import { ButtonType, InputType, ToastType, ValidationState } from '../../interfaces/interfaces.ts';
import './SignInPage.css';

const signInSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Please fill in all fields' })
        .email({ message: 'Email is not valid' }),
    password: z.string().min(1, { message: 'Please fill in all fields' }),
});

type SignInFormValues = z.infer<typeof signInSchema>;

const SignInPage = () => {
    const { addToast } = useToast();
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<SignInFormValues>({
        resolver: zodResolver(signInSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const getValidationState = (
        error: boolean,
        isTouched: boolean,
        value: string,
    ): ValidationState => {
        if (!isTouched && !value) return ValidationState.IDLE;
        if (error) return ValidationState.INVALID;
        if (!error && value) return ValidationState.VALID;
        return ValidationState.IDLE;
    };

    const onSubmit: SubmitHandler<SignInFormValues> = async (data) => {
        try {
            await login({ email: data.email, password: data.password });
            addToast('Successfully signed in!', ToastType.SUCCESS);
            navigate('/');
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '';
            addToast(
                `Failed to sign into account${errorMessage ? `. ${errorMessage}` : ''}. Please try again.`,
                ToastType.ERROR,
            );
        }
    };

    const onInvalid = () => {
        addToast('Please check your input fields', ToastType.ERROR);
    };

    return (
        <AuthLayout
            title="Sign in into an account"
            subtitle={'Enter your email and password \n' + 'to sign in into this app'}
            bottomText="Forgot to create an account? "
            bottomLink={{ text: 'Sign up', href: '/signup' }}
        >
            <form className="auth-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Input
                            type={InputType.EMAIL}
                            label="Email"
                            placeholder="Enter email"
                            value={field.value}
                            onChange={field.onChange}
                            validationState={getValidationState(
                                !!fieldState.error,
                                fieldState.isTouched,
                                field.value,
                            )}
                            errorMessage={fieldState.error?.message || 'Email is not valid'}
                            icon={<EmailIcon />}
                            disabled={isSubmitting}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Input
                            type={InputType.PASSWORD}
                            label="Password"
                            placeholder="Enter password"
                            value={field.value}
                            onChange={field.onChange}
                            validationState={getValidationState(
                                !!fieldState.error,
                                fieldState.isTouched,
                                field.value,
                            )}
                            successMessage="Your password is correct"
                            errorMessage={fieldState.error?.message || 'Incorrect password'}
                            icon={<PasswordIcon />}
                            disabled={isSubmitting}
                            showPasswordToggle={true}
                        />
                    )}
                />

                <div className="auth-form-button-container">
                    <Button
                        label={isSubmitting ? 'Signing In...' : 'Sign In'}
                        disabled={isSubmitting}
                        type={ButtonType.SUBMIT}
                    />
                </div>
            </form>
        </AuthLayout>
    );
};

export default SignInPage;
