export const fetchPostsGraphQL = jest.fn().mockResolvedValue([
    {
        id: 1,
        title: 'Mock Post',
        content: 'Mock Content',
        authorId: 1,
        likedByUsers: [],
        creationDate: new Date().toISOString(),
    },
]);
