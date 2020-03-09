import React from 'react'
import {Card,Image,Button,Icon,Label} from 'semantic-ui-react'
import moment from 'moment'

const PostCard = ({post:{body,createdAt,id,username,likeCount,commentCount,likes}}) => {

    const likePost = () => {
        console.log("Post Like")
    }

    const onPostComment = () => {
        console.log("Comment on Post")
    }


    return(
        <Card fluid>

            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>

            <Card.Content extra>
                <Button as='div' labelPosition='right' onClick={likePost}>
                    <Button color='teal' basic>
                        <Icon name='heart' />
                        
                    </Button>
                    <Label  basic color='teal' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right' onClick={onPostComment}>
                    <Button color='blue' basic>
                        <Icon name='comment' />
                        
                    </Button>
                    <Label  basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>

    </Card>
    )

}


export default PostCard;