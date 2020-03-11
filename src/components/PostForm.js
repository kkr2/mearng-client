import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import {useForm} from '../util/hooks'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import {FETCH_POSTS} from '../util/graphql'
 function PostForm() {

    const {values,onChange,onSubmit}=useForm(()=>createPost(),{
        body:''
    });
    const[createPost,{error}]=useMutation(CREATE_POST_MUTATION,{

        
        update(proxy,result){
            
            const data = proxy.readQuery({
                query:FETCH_POSTS
            })
            const new_post = result.data.createPost;
            proxy.writeQuery({
                query:FETCH_POSTS,
                data:{getPosts:[new_post,...data.getPosts]}
            })
            values.body='';
        },
        
        variables:values
    })

    

    return (
        
        
        <Form onSubmit={onSubmit}>
            <h2>Create a Post</h2>
            <Form.Field>
                <Form.Input
                placeholder="Hi"
                name="body"
                onChange={onChange}
                value={values.body}
                error={error ? true : false}
                />

            <Button type="submit" color="teal">
                submit
            </Button>
            </Form.Field>
            
            </Form>
          
    
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;


export default PostForm;