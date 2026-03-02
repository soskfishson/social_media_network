const GRAPHQL_ENDPOINT = '/api/graphql';

export async function fetchPostsGraphQL() {
    const query = `
        query AllPosts {
            allPosts {
                id
                authorId
                title
                content
                image
                creationDate
                likedByUsers {
                    id
                }
            }
        }
    `;

    const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, operationName: 'AllPosts' }),
    });

    const result = await response.json();
    return result.data.allPosts;
}
