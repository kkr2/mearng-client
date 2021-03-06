import React,{useContext,useEffect,useState} from 'react'
// import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import {Grid , Transition} from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import {AuthContext} from '../context/auth'
import PostForm from '../components/PostForm'
import {FETCH_POSTS} from '../util/graphql'

 const Home = ()=> {

    const [posts, setPosts] = useState([]);
    const{user}=useContext(AuthContext)


    const {loading, data } = useQuery(FETCH_POSTS);
    useEffect(() => {
		if (data) {
			setPosts(data.getPosts);
		}
	}, [data]);
 
    return (
        <Grid columns={3} divided>
                <Grid.Row className="page-title">
                <h1>Recent Posts</h1>
                </Grid.Row>
                <Grid.Row>
                    {user&&(
                        <Grid.Column>
                            <PostForm/>
                        </Grid.Column>
                    )
                    }
                    {loading ? (
                        <h1>Loading .... </h1>
                    ):(
                       <Transition.Group>
                            {posts && posts.map(post => (
                               <Grid.Column key={post.id} style={{marginBottom:20}}>
                                   <PostCard post={post}/>
                               </Grid.Column>

                           ))}

                       </Transition.Group>
                           
                           
                    )}
                </Grid.Row>
         </Grid>
    )
}




export default Home;