import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Post } from '../interfaces/interfaces.ts';
import { apiClient } from '../api/api.ts';

interface LikeResponse {
    status: 'liked' | 'disliked';
    postId: number;
    newLikesCount: number;
}

export function useLikeMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (postId: number) => {
            const { data } = await apiClient.post<LikeResponse>('/api/like', { postId });
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.setQueryData(['posts'], (oldPosts: Post[] | undefined) => {
                if (!oldPosts) {
                    return undefined;
                }
                return oldPosts.map((post) =>
                    post.id === data.postId ? { ...post, likesCount: data.newLikesCount } : post,
                );
            });
        },
    });
}

export function useDislikeMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (postId: number) => {
            const { data } = await apiClient.post<LikeResponse>('/api/dislike', { postId });
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.setQueryData(['posts'], (oldPosts: Post[] | undefined) => {
                if (!oldPosts) {
                    return undefined;
                }
                return oldPosts.map((post) =>
                    post.id === data.postId ? { ...post, likesCount: data.newLikesCount } : post,
                );
            });
        },
    });
}
