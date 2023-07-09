import React from 'react'
import { formatISO9075 } from 'date-fns'
import { Link } from 'react-router-dom'

import {
    Box,
    Image,
    useColorModeValue,
    Heading,
    Text,
    Container
} from '@chakra-ui/react';

export default function Posts({ _id, title, summery, cover, content, createdAt, auth }) {
    return (
        <Container maxW={'7xl'} p="5">
            <div>
                {/* Posts */}
                <div className='post'>
                    {/*start */}
                    <Box
                        display="flex"
                        flex="1"
                        marginRight="3"
                        position="relative"
                        alignItems="center">
                        <Box
                            width={{ base: '100%', sm: '85%' }}
                            zIndex="2"
                            marginLeft={{ base: '0', sm: '5%' }}
                            marginTop="5%">
                            <Link to={`/post/${_id}`} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                                <Image
                                    borderRadius="lg"
                                    src={'http://localhost:4000/' + cover}
                                    alt="some good alt text"
                                    objectFit="contain"
                                />
                            </Link>
                        </Box>
                        <Box zIndex="1" width="100%" position="absolute" height="100%">
                            <Box
                                bgGradient={useColorModeValue(
                                    'radial(orange.600 1px, transparent 1px)',
                                    'radial(orange.300 1px, transparent 1px)'
                                )}
                                backgroundSize="20px 20px"
                                opacity="0.4"
                                height="100%"
                            />
                        </Box>
                    </Box>

                    <Box
                        display="flex"
                        flex="1"
                        flexDirection="column"
                        justifyContent="center"
                        marginTop={{ base: '3', sm: '0' }}>
                        <Heading marginTop="1">
                            <Link to={`/post/${_id}`} textDecoration="none" _hover={{ textDecoration: 'none' }}>
                            {title}
                            </Link>
                        </Heading>
                        <Text
                            as="p"
                            marginTop="2"
                            color={useColorModeValue('gray.700', 'gray.200')}
                            fontSize="lg">
                            {summery}
                        </Text>
                        <Text marginTop="2"
                              className='author'
                              fontSize="sm"
                              >
                               <b>{auth.username}</b> | {formatISO9075(new Date(createdAt))}</Text>
                    </Box>

                {/*end */}
                
            </div>
        </div>
        </Container >
    )
}
