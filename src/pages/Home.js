import React from 'react'
import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import {Grid} from 'semantic-ui-react'
import PostCard from '../components/PostCard'


 const Home = ()=> {

    const {loading,
         data
        } = useQuery(FETCH_POSTS);

  

    return (
        <Grid columns={3} divided>
                <Grid.Row>
                <h1>Recent Posts</h1>
                </Grid.Row>
                <Grid.Row>
                    {loading ? (
                        <h1>Loading .... </h1>
                    ):(
                       
                           data.getPosts && data.getPosts.map(post => (
                               <Grid.Column key={post.id} style={{marginBottom:20}}>
                                   <PostCard post={post}/>
                               </Grid.Column>

                           ))
                           
                    )}
                </Grid.Row>
         </Grid>
    )
}


const FETCH_POSTS = gql `
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


export default Home;