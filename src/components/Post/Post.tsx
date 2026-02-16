import { type SyntheticEvent, useReducer, useState } from 'react';
import Button from '../Button/Button.tsx';
import Input from '../Input/Input';
import useTimeAgo from '../../hooks/useTimeAgo';
import { ButtonType, InputType, type PostData, ToastType, ValidationState } from '../../interfaces/interfaces.ts';
import useAuth from '../../hooks/useAuth';
import LikeIcon from '../../assets/like.svg?react';
import CommentIcon from '../../assets/comments.svg?react';
import ChevronExpanded from '../../assets/ChevronExpanded.svg?react';
import ChevronHidden from '../../assets/ChevronHidden.svg?react';
import PencilIcon from '../../assets/PencilIcon.svg?react';
import './Post.css';
import useToast from '../../hooks/useToast.ts';

interface PostProps {
    post: PostData;
}

interface CommentFormState {
    text: string;
    isSubmitting: boolean;
}

enum FormActionType {
    SET_TEXT = 'SET_TEXT',
    SUBMIT_START = 'SUBMIT_START',
    SUBMIT_SUCCESS = 'SUBMIT_SUCCESS',
}

interface CommentFormAction {
    type: FormActionType;
    payload?: string;
}

const initialFormState: CommentFormState = { text: '', isSubmitting: false };

const commentReducer = (state: CommentFormState, action: CommentFormAction): CommentFormState => {
    switch (action.type) {
        case FormActionType.SET_TEXT:
            return { ...state, text: action.payload || '' };
        case FormActionType.SUBMIT_START:
            return { ...state, isSubmitting: true };
        case FormActionType.SUBMIT_SUCCESS:
            return { ...state, isSubmitting: false, text: '' };
        default:
            return state;
    }
};

const Post = ({ post }: PostProps) => {
    const postTimeStamp = useTimeAgo(post.time);
    const [commentsShown, setCommentsShown] = useState<boolean>(false);
    const [formState, dispatch] = useReducer(commentReducer, initialFormState);
    const { isLoggedIn } = useAuth();
    const [isLiked, setIsLiked] = useState<boolean>(post.isLiked);
    const { addToast } = useToast();

    const toggleCommentsVisibility = () => {
        setCommentsShown(!commentsShown);
    };

    const handleCommentSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (!formState.text.trim()) {
            return;
        }

        dispatch({ type: FormActionType.SUBMIT_START });
        console.log('Submitted comment:', formState.text);
        dispatch({ type: FormActionType.SUBMIT_SUCCESS });
        addToast('Your comment is published', ToastType.SUCCESS);
    };

    const getValidationState = (): ValidationState => {
        if (!formState.text) {
            return ValidationState.IDLE;
        }
        if (formState.text.length > 200) {
            return ValidationState.INVALID;
        }
        return ValidationState.VALID;
    };

    const toggleLike = () => {
        if(isLoggedIn) {
            setIsLiked(!isLiked);
        } else {
            addToast('You need to log in to interract with the post', ToastType.ERROR);
        }
    }

    return (
        <article className="post-card">
            <header className="post-header">
                <img
                    src={post.author.pfplink}
                    alt={`${post.author.name}'s profile`}
                    className="post-avatar"
                />
                <div className="post-meta">
                    <h3 className="post-author-name">{post.author.name}</h3>
                    <time className="post-timestamp">{postTimeStamp}</time>
                </div>
            </header>

            <div className="post-content">
                {post.image ? (
                    <figure className="post-figure">
                        <img src={post.image} alt="Post content" className="post-image" />
                        <figcaption className="post-caption">{post.content}</figcaption>
                    </figure>
                ) : (
                    <p className="post-caption">{post.content}</p>
                )}
            </div>

            <footer className="post-footer">
                <div className="post-actions">
                    <Button
                        type={ButtonType.BUTTON}
                        className={`action-btn ${isLiked ? 'liked' : ''}`}
                        onClick={toggleLike}>
                            <LikeIcon />
                            <span>{post.likes} likes</span>
                    </Button>

                    <Button
                        type={ButtonType.BUTTON}
                        className="action-btn"
                        onClick={isLoggedIn ? toggleCommentsVisibility : undefined}>
                            <CommentIcon />
                            <span>
                                {isLoggedIn
                                    ? `${post.comments.length} comments`
                                    : 'Login to view comments'
                                }
                            </span>
                    </Button>

                    {isLoggedIn && (
                        <Button
                            type={ButtonType.BUTTON}
                            className="action-btn comment-button"
                            onClick={toggleCommentsVisibility}>
                            {commentsShown ? <ChevronExpanded /> : <ChevronHidden />}
                        </Button>
                    )}
                </div>

                {isLoggedIn && commentsShown && (
                    <div className="comments-section">
                        {post.comments.map((comment, index) => (
                            <div key={index} className="comment-item">
                                <strong>#{index + 1}</strong> {comment}
                            </div>
                        ))}
                        <form onSubmit={handleCommentSubmit} className="comment-form">
                            <Input
                                type={InputType.TEXTAREA}
                                label="Add a comment"
                                placeholder="Write description here..."
                                value={formState.text}
                                onChange={(value) => dispatch({ type: FormActionType.SET_TEXT, payload: value })}
                                validationState={getValidationState()}
                                errorMessage="Reached the 200 text limit"
                                icon={<PencilIcon />}
                                disabled={formState.isSubmitting}
                                backgroundColor="var(--color-input-bg)"
                            />

                            <div className="submit-wrapper">
                                <Button
                                    label={formState.isSubmitting ? "Posting..." : "Post Comment"}
                                    type={ButtonType.SUBMIT}
                                    disabled={formState.isSubmitting || !formState.text.trim()}
                                />
                            </div>
                        </form>
                    </div>
                )}
            </footer>
        </article>
    );
};

export default Post;