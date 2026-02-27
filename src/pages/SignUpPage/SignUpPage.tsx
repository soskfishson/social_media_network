import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import EmailIcon from '../../assets/Email.svg?react';
import PasswordIcon from '../../assets/Eye.svg?react';
import useToast from '../../hooks/useToast';
import useAuth from '../../hooks/useAuth';

import { ButtonType, InputType, ToastType, ValidationState } from '../../interfaces/interfaces';
import './SignUpPage.css';

const validationSchema = Yup.object({
    email: Yup.string()
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email is not valid')
        .required('Please fill in all fields'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Please fill in all fields'),
});

const getValidationState = (
    value: string,
    touched: boolean,
    error: string | undefined,
): ValidationState => {
    if (!touched) {
        return ValidationState.IDLE;
    }
    if (error) {
        return ValidationState.INVALID;
    }
    if (value && !error) {
        return ValidationState.VALID;
    }

    return ValidationState.IDLE;
};

const SignUpPage = () => {
    const { addToast } = useToast();
    const { register } = useAuth();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const nameFromEmail = values.email.split('@')[0];

                await register({
                    email: values.email,
                    password: values.password,
                    firstName: nameFromEmail,
                    secondName: 'User',
                });
                navigate('/');
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to create account';
                addToast(message, ToastType.ERROR);
                console.error(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <AuthLayout
            title="Create an account"
            subtitle="Enter your email and password to sign up for this app"
            bottomText="Already have an account?"
            bottomLink={{ text: 'Sign in', href: '/signin' }}
        >
            <form className="auth-form" onSubmit={formik.handleSubmit} noValidate>
                <Input
                    type={InputType.EMAIL}
                    label="Email"
                    placeholder="Enter email"
                    value={formik.values.email}
                    onChange={(value) => formik.setFieldValue('email', value)}
                    onBlur={() => formik.setFieldTouched('email', true)}
                    validationState={getValidationState(
                        formik.values.email,
                        !!formik.touched.email,
                        formik.errors.email,
                    )}
                    errorMessage={formik.errors.email}
                    icon={<EmailIcon />}
                    disabled={formik.isSubmitting}
                />

                <Input
                    type={InputType.PASSWORD}
                    label="Password"
                    placeholder="Enter password"
                    value={formik.values.password}
                    onChange={(value) => formik.setFieldValue('password', value)}
                    onBlur={() => formik.setFieldTouched('password', true)}
                    validationState={getValidationState(
                        formik.values.password,
                        !!formik.touched.password,
                        formik.errors.password,
                    )}
                    successMessage="Your password is strong"
                    errorMessage={formik.errors.password}
                    icon={<PasswordIcon />}
                    disabled={formik.isSubmitting}
                    showPasswordToggle={true}
                />

                <div className="auth-form-button-container">
                    <Button
                        label={formik.isSubmitting ? 'Signing Up...' : 'Sign Up'}
                        disabled={formik.isSubmitting || !formik.isValid || !formik.dirty}
                        type={ButtonType.SUBMIT}
                    />
                </div>

                <p className="auth-terms">
                    By clicking continue, you agree to our{' '}
                    <a href="/terms" className="auth-terms-link">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="auth-terms-link">
                        Privacy Policy
                    </a>
                </p>
            </form>
        </AuthLayout>
    );
};

export default SignUpPage;
