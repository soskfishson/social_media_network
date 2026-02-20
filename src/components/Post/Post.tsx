import { type SyntheticEvent, useReducer, useState, memo } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardMedia,
    CircularProgress,
    Collapse,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { type Post as PostType, ToastType } from '../../interfaces/interfaces';
import { useAddCommentMutation, useCommentsQuery } from '../../hooks/useCommentsQuery';
import { useDislikeMutation, useLikeMutation } from '../../hooks/useLikeMutation';
import { useUserQuery } from '../../hooks/useUserQuery.ts';
import useAuth from '../../hooks/useAuth';
import useToast from '../../hooks/useToast';
import useTimeAgo from '../../hooks/useTimeAgo';
import CommentItem from '../CommentItem/CommentItem';

const StyledCard = styled(Card)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
    padding: '24px',
    backgroundColor: 'var(--bg-app)',
    border: '2px solid var(--surface-3)',
    borderRadius: 0,
    boxShadow: 'none',
    backgroundImage: 'none',
    '& + &': {
        borderTop: 'none',
    },
}));

const PostHeader = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
});

const PostCaption = styled(Typography)(({ theme }) => ({
    fontFamily: "'Inter', sans-serif",
    fontSize: '20px',
    color: 'var(--text-primary)',
    whiteSpace: 'pre-wrap',
    [theme.breakpoints.down(720)]: {
        fontSize: '14px',
    },
}));

const ActionButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isLiked',
})<{ isLiked?: boolean }>(({ theme, isLiked }) => ({
    textTransform: 'none',
    fontFamily: "'Inter', sans-serif",
    fontSize: '1rem',
    padding: 0,
    minWidth: 'auto',
    color: isLiked ? 'var(--negative-main)' : 'var(--text-primary)',
    '&:hover': {
        backgroundColor: 'transparent',
        opacity: 0.8,
    },
    '& svg': {
        width: '24px',
        height: '24px',
    },
    [theme.breakpoints.down(720)]: {
        fontSize: '12px',
    },
}));

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

interface PostProps {
    post: PostType;
}

export const PostComponent = ({ post }: PostProps) => {
    const [formState, dispatch] = useReducer(commentReducer, { text: '', isSubmitting: false });
    const [commentsShown, setCommentsShown] = useState(false);

    const { user, isLoggedIn } = useAuth();
    const { addToast } = useToast();
    const timeAgo = useTimeAgo(post.creationDate);

    const { data: author, isLoading: authorLoading } = useUserQuery(post.authorId);

    const { data: comments = [], isLoading: commentsLoading } = useCommentsQuery(post.id);

    const likeMutation = useLikeMutation();
    const dislikeMutation = useDislikeMutation();
    const addCommentMutation = useAddCommentMutation();

    const isLikedByMe = post.likedByUsers?.some((u) => u.id === user?.id) ?? false;

    const handleToggleLike = () => {
        if (!isLoggedIn) {
            addToast('Login to like posts', ToastType.ERROR);
            return;
        }

        if (isLikedByMe) {
            dislikeMutation.mutate(post.id, {
                onError: () => addToast('Failed to dislike post', ToastType.ERROR),
            });
        } else {
            likeMutation.mutate(post.id, {
                onError: () => addToast('Failed to like post', ToastType.ERROR),
            });
        }
    };

    const handleToggleComments = () => {
        setCommentsShown(!commentsShown);
    };

    const handleCommentSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (!formState.text.trim()) return;

        dispatch({ type: FormActionType.SUBMIT_START });
        addCommentMutation.mutate(
            { postId: post.id, text: formState.text },
            {
                onSuccess: () => {
                    dispatch({ type: FormActionType.SUBMIT_SUCCESS });
                    addToast('Comment published!', ToastType.SUCCESS);
                },
                onError: () => {
                    dispatch({ type: FormActionType.SUBMIT_SUCCESS });
                    addToast('Failed to post comment', ToastType.ERROR);
                },
            },
        );
    };

    return (
        <StyledCard>
            <PostHeader>
                {authorLoading ? (
                    <CircularProgress size={48} />
                ) : (
                    <Avatar
                        src={author?.profileImage || '/assets/default-avatar.png'}
                        sx={{ width: 48, height: 48 }}
                    />
                )}
                <Stack>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 500 }}>
                        {author?.firstName || `User ${post.authorId}`}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {timeAgo}
                    </Typography>
                </Stack>
            </PostHeader>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {post.image && (
                    <CardMedia
                        component="img"
                        image={post.image}
                        alt="Post"
                        sx={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                    />
                )}
                <PostCaption>
                    {post.title}
                    {post.image ? `\n${post.content}` : `. ${post.content}`}
                </PostCaption>
            </Box>

            <CardActions sx={{ padding: 0, gap: '16px' }}>
                <ActionButton
                    onClick={handleToggleLike}
                    isLiked={isLikedByMe}
                    disabled={likeMutation.isPending || dislikeMutation.isPending}
                >
                    {isLikedByMe ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    <span>{post.likesCount} likes</span>
                </ActionButton>

                <ActionButton onClick={handleToggleComments} disabled={!isLoggedIn}>
                    <CommentIcon />
                    <span>{isLoggedIn ? `${post.commentsCount} comments` : 'Login to view'}</span>
                </ActionButton>

                {isLoggedIn && (
                    <ActionButton onClick={handleToggleComments}>
                        {commentsShown ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </ActionButton>
                )}
            </CardActions>

            <Collapse in={commentsShown && isLoggedIn}>
                <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {commentsLoading ? (
                        <CircularProgress size={20} />
                    ) : (
                        <Stack spacing={2}>
                            {comments.map((comment) => (
                                <CommentItem key={comment.id} comment={comment} />
                            ))}

                            <Box
                                component="form"
                                onSubmit={handleCommentSubmit}
                                sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
                            >
                                <TextField
                                    multiline
                                    rows={3}
                                    placeholder="Write description here..."
                                    value={formState.text}
                                    onChange={(e) =>
                                        dispatch({
                                            type: FormActionType.SET_TEXT,
                                            payload: e.target.value,
                                        })
                                    }
                                    disabled={formState.isSubmitting}
                                    fullWidth
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        disabled={formState.isSubmitting || !formState.text.trim()}
                                        sx={{ textTransform: 'none' }}
                                    >
                                        {formState.isSubmitting ? 'Posting...' : 'Post Comment'}
                                    </Button>
                                </Box>
                            </Box>
                        </Stack>
                    )}
                </Box>
            </Collapse>
        </StyledCard>
    );
};

const Post = memo(PostComponent);
export default Post;
