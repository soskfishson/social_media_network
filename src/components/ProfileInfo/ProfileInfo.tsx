import { type SyntheticEvent, useReducer } from 'react';
import useAuth from '../../hooks/useAuth.ts';
import Input from '../Input/Input.tsx';
import useTheme from '../../hooks/useTheme.ts';
import { ButtonType, InputType, ThemeTypes, ToastType } from '../../interfaces/interfaces.ts';
import Button from '../Button/Button.tsx';
import UserIcon from '../../assets/User.svg?react';
import EmailIcon from '../../assets/Email.svg?react';
import PencilIcon from '../../assets/PencilIcon.svg?react';
import './ProfileInfo.css';
import useToast from '../../hooks/useToast.ts';

interface ProfileFormState {
    username: string;
    email: string;
    description: string;
    profilePhoto: File | null;
    isSubmitting: boolean;
}

enum FormActionType {
    SET_USERNAME = 'SET_USERNAME',
    SET_EMAIL = 'SET_EMAIL',
    SET_DESCRIPTION = 'SET_DESCRIPTION',
    SET_PHOTO = 'SET_PHOTO',
    SUBMIT_START = 'SUBMIT_START',
    SUBMIT_SUCCESS = 'SUBMIT_SUCCESS',
}

interface FormAction {
    type: FormActionType;
    payload?: string | File | null;
}

const reducer = (state: ProfileFormState, action: FormAction): ProfileFormState => {
    switch (action.type) {
        case FormActionType.SET_USERNAME:
            if (!action.payload) {
                console.log('Username not provided');
                return {...state, username: ''};
            }
            return { ...state, username: action.payload as string };
        case FormActionType.SET_EMAIL:
            if (!action.payload) {
                console.log('Email not provided');
                return {...state, email: ''};
            }
            return { ...state, email: action.payload as string };
        case FormActionType.SET_DESCRIPTION:
            if (!action.payload) {
                console.log('Description not provided');
                return {...state, description: ''};
            }
            return { ...state, description: action.payload as string };
        case FormActionType.SET_PHOTO:
            if (!action.payload) {
                console.log('Photo not provided');
                return {...state, profilePhoto: null};
            }
            return { ...state, profilePhoto: action.payload as File | null };
        case FormActionType.SUBMIT_START:
            return { ...state, isSubmitting: true };
        case FormActionType.SUBMIT_SUCCESS:
            return { ...state, isSubmitting: false };
        default:
            return state;
    }
};

const ProfileInfo = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { addToast } = useToast();

    const initialState: ProfileFormState = {
        username: user?.name || '',
        email: user?.email || '',
        description: user?.description || '',
        profilePhoto: null,
        isSubmitting: false
    };

    const [formState, dispatch] = useReducer(reducer, initialState);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch({ type: FormActionType.SUBMIT_START });

        try {
            console.log('Saving profile:', formState);
            const updatedUser = {
                ...user,
                name: formState.username,
                email: formState.email
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));

            setTimeout(() => {
                dispatch({ type: FormActionType.SUBMIT_SUCCESS });
            }, 1000);
            addToast('Profile info has been updated successfully', ToastType.SUCCESS)
        } catch (error) {
            console.error('Failed to save profile', error);
            dispatch({ type: FormActionType.SUBMIT_SUCCESS });
        }
    };

    const photoPreview = formState.profilePhoto
        ? URL.createObjectURL(formState.profilePhoto)
        : user?.pfplink;

    const handlePhotoClick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: Event) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                dispatch({ type: FormActionType.SET_PHOTO, payload: file });
            }
        };
        input.click();
    };

    const handleLogout = () => {
        logout();
    }

    const isDarkTheme = theme === ThemeTypes.DARK;

    return (
        <div className="profile-info-container">
            <div className="profile-edit-section">
                <h2 className="section-title">Edit profile</h2>

                <div className="profile-photo-section">
                    <img
                        src={photoPreview   }
                        alt={user?.name}
                        className="profile-photo"
                    />
                    <div className="profile-photo-info">
                        <h3 className="profile-name">{user?.name}</h3>
                        <Button
                            type={ButtonType.BUTTON}
                            onClick={handlePhotoClick}
                            className="change-photo-btn"
                        >
                            Change profile photo
                        </Button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="profile-form">
                    <Input
                        type={InputType.TEXT}
                        label="Username"
                        placeholder="@username123"
                        value={formState.username}
                        onChange={() => {}}
                        icon={<UserIcon />}
                        disabled={true}
                    />

                    <Input
                        type={InputType.EMAIL}
                        label="Email"
                        placeholder="email@example.com"
                        value={formState.email}
                        onChange={() => {}}
                        icon={<EmailIcon />}
                        disabled={true}
                    />

                    <Input
                        type={InputType.TEXTAREA}
                        label="Description"
                        placeholder="Write your bio..."
                        value={formState.description}
                        onChange={(value) => dispatch({ type: FormActionType.SET_DESCRIPTION, payload: value })}
                        icon={<PencilIcon />}
                        maxLength={200}
                        disabled={formState.isSubmitting}
                    />

                    <div className='save-button-container'>
                        <Button
                            label={formState.isSubmitting ? 'Saving...' : 'Save Profile Changes'}
                            disabled={formState.isSubmitting}
                        />
                    </div>
                </form>
            </div>

            <div className="profile-preferences-section">
                <h2 className="section-title">Preferences</h2>

                <div className="preference-item">
                    <label className="theme-toggle-container">
                        <input
                            type="checkbox"
                            checked={isDarkTheme}
                            onChange={toggleTheme}
                            className="theme-toggle-checkbox"
                        />
                        <span className={`theme-toggle-switch ${isDarkTheme ? 'active' : ''}`}>
                            <span className="theme-toggle-slider"></span>
                        </span>
                        <span className="theme-toggle-label">Dark theme</span>
                    </label>
                </div>

                <h2 className="section-title actions-title">Actions</h2>
                <div className="logout-button-container">
                    <Button label='Logout' onClick={handleLogout} />
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;