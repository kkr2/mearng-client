import React , {useContext,useState,useRef} from 'react'
import gql from 'graphql-tag'
import {useQuery,useMutation} from '@apollo/react-hooks'
import moment from 'moment'
import {Card,Form,Image,Button,Icon,Label,Grid } from 'semantic-ui-react'
import {AuthContext} from '../context/auth'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'



const SinglePost = (props) => {
    const postId = props.match.params.postId;
    const [comment,setComment]=useState('');
    const commentInputRef = useRef(null);
    const{user}=useContext(AuthContext);

    const {loading,data} = useQuery(FETCH_POST,{
        variables:{postId}
    })

    const [createComment]= useMutation(CREATE_COMMENT,{
        update(){
            setComment('');
            commentInputRef.current.blur();
        },
        variables:{
            postId,
            body:comment
        }
    })


    let postMarkup;

    if(loading){
        postMarkup=<p>Loading...</p>
    }else{
        const {id ,body,createdAt,username,comments,likes,likeCount,commentCount}=data.getPost;
        postMarkup=(
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                    <Image
                        floated='right'
                        size='small'
                        src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                        <Card.Content>
                            <Card.Header>{username}</Card.Header>
                            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        <LikeButton user={user} post={{id,likes,likeCount}}/>
                            <Button  labelPosition='right' as='div' onClick={()=>console.log("delete post")}>
                                <Button color='blue' basic>
                                    <Icon name='comment' />
                                </Button>
                                <Label  basic color='blue' pointing='left'>
                                    {commentCount}
                                </Label>
                            </Button>
                            {user && user.username === username && <DeleteButton postId={id} callback={()=>props.history.push('/')}/>}
                        </Card.Content>
                        </Card>
                        {user && <Card fluid>
                            <Card.Content>
                            <p>Post a comment</p>
                            <Form>
                            <div className="ui action input fluid">
                                <input
                                    type="text"
                                    placeholder="Comment.."
                                    name="comment"
                                    value={comment}
                                    onChange={(event) => setComment(event.target.value)}
                                    ref={commentInputRef}
                                />
                                <button
                                    type="submit"
                                    className="ui button teal"
                                    disabled={comment.trim() === ''}
                                    onClick={createComment}
                                >
                                    Submit
                                </button>
                                </div>
                            </Form>
                            </Card.Content>
                            </Card>
                            }
                        {comments.map(comment=>(
                            <Card key={comment.id} fluid>
                                <Card.Content>
                                    {user&&user.username===comment.username&&(
                                        <DeleteButton postId={id} commentId={comment.id}/>
                                    )}
                                <Card.Header>{comment.username}</Card.Header>
                                <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{comment.body}</Card.Description>
                            </Card.Content>
                            </Card>
                             ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
    return postMarkup;

}


const FETCH_POST = gql `

query getPost($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  } 

`

const CREATE_COMMENT = gql`
mutation createComment($postId:ID!,$body:String!){
  createComment(postId:$postId,body:$body){
    id
    comments{
      id body createdAt username
    }
    commentCount
  }
}
`



export default SinglePost ;