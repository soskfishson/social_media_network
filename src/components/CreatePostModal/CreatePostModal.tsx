import { type SyntheticEvent, useReducer } from 'react';
import Input from '../Input/Input.tsx';
import { ButtonType, InputType } from '../../interfaces/interfaces.ts';
import Button from '../Button/Button.tsx';
import EmailIcon from '../../assets/Email.svg?react';
import PencilIcon from '../../assets/PencilIcon.svg?react';
import './CreatePostModal.css';

interface CreatePostFormState {
    title: string;
    description: string;
    attachment: File | null;
    isSubmitting: boolean;
}

enum FormActionType {
    SET_TITLE = 'SET_TITLE',
    SET_DESCRIPTION = 'SET_DESCRIPTION',
    SET_ATTACHMENT = 'SET_ATTACHMENT',
    SUBMIT_START = 'SUBMIT_START',
    SUBMIT_SUCCESS = 'SUBMIT_SUCCESS',
    RESET = 'RESET',
}

interface FormAction {
    type: FormActionType;
    payload?: string | File | null;
}

const initialState: CreatePostFormState = {
    title: '',
    description: '',
    attachment: null,
    isSubmitting: false
};

const reducer = (state: CreatePostFormState, action: FormAction): CreatePostFormState => {
    switch (action.type) {
        case FormActionType.SET_TITLE:
            return { ...state, title: action.payload as string };
        case FormActionType.SET_DESCRIPTION:
            return { ...state, description: action.payload as string };
        case FormActionType.SET_ATTACHMENT:
            return { ...state, attachment: action.payload as File };
        case FormActionType.SUBMIT_START:
            return { ...state, isSubmitting: true };
        case FormActionType.SUBMIT_SUCCESS:
            return { ...state, isSubmitting: false };
        case FormActionType.RESET:
            return initialState;
        default:
            return state;
    }
}

interface CreatePostModalProps {
    title?: string;
    isOpen: boolean;
    onClose: () => void;
}

const CreatePostModal = ({ title: initialTitle, isOpen, onClose }: CreatePostModalProps) => {
    const [formState, dispatch] = useReducer(reducer, {
        ...initialState,
        title: initialTitle || ''
    });

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!formState.title || !formState.description) {
            console.log('Please fill in all fields');
            return;
        }
        dispatch({ type: FormActionType.SUBMIT_START });

        try {
            console.log('Creating post:', formState);

            dispatch({ type: FormActionType.SUBMIT_SUCCESS });
            dispatch({ type: FormActionType.RESET });
            onClose();
        } catch (error) {
            console.error('Failed to create post', error);
            dispatch({ type: FormActionType.SUBMIT_SUCCESS });
        }
    };

    const handleClose = () => {
        dispatch({ type: FormActionType.RESET });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className='modal-container' onClick={onClose}>
            <dialog
                open={isOpen}
                className="create-post-modal"
                onClick={(e) => e.stopPropagation()} >
                <header className="modal-header">
                    <h2>Create a new post</h2>
                    <Button
                        type={ButtonType.CLOSE}
                        onClick={handleClose}
                        className="close-button"
                    >
                        ×
                    </Button>
                </header>

                <form onSubmit={handleSubmit} className="modal-form">
                    <Input
                        type={InputType.TEXT}
                        icon={<EmailIcon/>}
                        label='Post Title'
                        placeholder='Enter post title'
                        value={formState.title}
                        onChange={(value) => dispatch({ type: FormActionType.SET_TITLE, payload: value })}
                        disabled={formState.isSubmitting}
                    />

                    <Input
                        type={InputType.TEXTAREA}
                        icon={<PencilIcon/>}
                        label='Description'
                        placeholder="Write description here..."
                        value={formState.description}
                        onChange={(value) => dispatch({
                            type: FormActionType.SET_DESCRIPTION,
                            payload: value
                        })}
                        disabled={formState.isSubmitting}
                    />

                    <Input
                        type={InputType.FILE}
                        label=''
                        placeholder='Select a file or drag and drop here'
                        value=""
                        backgroundColor='var(--bg-app)'
                        onChange={() => {}}
                        onFileChange={(file) => dispatch({
                            type: FormActionType.SET_ATTACHMENT,
                            payload: file
                        })}
                        accept=".jpg,.jpeg,.png,.pdf"
                        disabled={formState.isSubmitting}
                    />

                    <div className="button-wrapper">
                        <Button
                            label={formState.isSubmitting ? 'Creating...' : 'Create'}
                            disabled={formState.isSubmitting}
                        />
                    </div>
                </form>
            </dialog>
        </div>
    );
}

export default CreatePostModal;