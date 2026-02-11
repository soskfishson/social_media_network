import { useReducer, useState, type ChangeEvent, type SyntheticEvent } from 'react';
import SubmitButton from '../SubmitButton/SubmitButton';
import useAuth from '../../hooks/useAuth.ts';
import './CreatePostForm.css';
import CreatePostModal from '../CreatePostModal/CreatePostModal.tsx';

interface CreatePostFormState {
    text: string;
    isSubmitting: boolean;
}

enum FormActionType {
    SET_TEXT = 'SET_TEXT',
    SUBMIT_START = 'SUBMIT_START',
    SUBMIT_SUCCESS = 'SUBMIT_SUCCESS',
}

interface CreatePostFormAction {
    type: FormActionType;
    payload?: string;
}

const initialState: CreatePostFormState = {
    text: '',
    isSubmitting: false
};

const reducer = (state: CreatePostFormState, action: CreatePostFormAction): CreatePostFormState => {
    switch (action.type) {
        case FormActionType.SET_TEXT:
            if (!action.payload) {
                console.log('Text payload is empty');
                return { ...state, text: '' };
            }
            return { ...state, text: action.payload };
        case FormActionType.SUBMIT_START:
            return { ...state, isSubmitting: true };
        case FormActionType.SUBMIT_SUCCESS:
            return { ...state, isSubmitting: false, text: '' };
        default:
            return state;
    }
}

const CreatePostForm = () => {
    const [formState, dispatch] = useReducer(reducer, initialState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const { user } = useAuth();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: FormActionType.SET_TEXT, payload: e.target.value });
    };

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (!formState.text.trim()) {
            return;
        }

        dispatch({ type: FormActionType.SUBMIT_START });

        setModalTitle(formState.text);
        setIsModalOpen(true);

        console.log('Opening modal with text:', formState.text);
        dispatch({ type: FormActionType.SUBMIT_SUCCESS });
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalTitle('');
    };

    const { text, isSubmitting } = formState;

    return (
        <>
            <form className="create-post-form" onSubmit={handleSubmit}>
                <img
                    src={user!.pfplink}
                    alt="User Avatar"
                    className="cp-avatar"
                />

                <div className="cp-input-container">
                    <input
                        type="text"
                        className="cp-input"
                        placeholder="What's happening?"
                        value={text}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                    />
                </div>

                <div className="cp-button-wrapper">
                    <SubmitButton
                        label={isSubmitting ? "Posting..." : "Tell everyone"}
                        type="submit"
                        disabled={isSubmitting || !text.trim()}
                    />
                </div>
            </form>

            {isModalOpen && (
                <CreatePostModal
                    title={modalTitle}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
}

export default CreatePostForm;