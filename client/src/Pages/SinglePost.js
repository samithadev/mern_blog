import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../UserContext'

import {
    Image,
    VStack,
    Heading,
    Text,
    Box,
    Button,
    Flex
} from '@chakra-ui/react'

export default function SinglePost() {
    const [postInfo, setPostInfo] = useState(null)
    const { userInfo } = useContext(UserContext)

    const { id } = useParams()

    const SERVER_URL = import.meta.env.SERVER_URL;

    useEffect(() => {
        fetch(`${SERVER_URL}/post/${id}`).then(
            response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo)
                })
            }
        )
    }, [])

    const handleDelete = () => {
        fetch(`${SERVER_URL}/post/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          if (response.ok) {
            window.location.href = '/'; // Redirect to home page after successful deletion
          }
        });
      };
    

    if (!postInfo) return '';
    return (
        <div className='Post-page'>
            {/*Start */}
            <VStack paddingTop="20px" marginBottom="30px" spacing="2" alignItems="center">

                <Heading as="h2">{postInfo.title}</Heading>

                {userInfo.id === postInfo.auth._id && (
                    <Flex>
                        <Button ><Link className="button-link" to={`/edit/${postInfo._id}`}>Edit Post</Link></Button>
                        <Button marginLeft="3%" bg={'red.500'} color={'white'} 
                        _hover={{
                            bg: 'red.600',
                        }}><Link className="button-link" onClick={handleDelete}>Delete Post</Link></Button>
                    </Flex>
                )}
                <Box
                    width={{ base: '100%', sm: '65%' }}
                    zIndex="2"
                    marginLeft={{ base: '0', sm: '5%' }}
                    marginTop="3%">
                    <Image objectFit="contain" src={`${SERVER_URL}/${postInfo.cover}`} />
                </Box >

                <Text as="p" fontSize="lg">
                    {postInfo.content}
                </Text>
            </VStack>
            {/*end */}
            
        </div>
    )
}
