import gql from 'graphql-tag'

export const FETCH_POSTS = gql `
{
    getPosts{
    id body createdAt username likeCount
    likes{
        username
    }
    commentCount
    comments{
        id username createdAt body
    }

    }
}

`
