import {
    Textarea, Flex, Button, Center, Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'
import { useState } from 'react'
import Tweet from './Tweet'


function Social() {

    const [tweetList, setTweetList] = useState([])
    const [tweet, setTweet] = useState('')
    const [isInvalid, setIsInvalid] = useState(false)
    


    const handleTweetChange = (event) => {
        setTweet(event.target.value)
        tweet.length > 20 ? setIsInvalid(true) : setIsInvalid(false)
    }


    return (
        <>
            <Flex justify={'center'} mt={'12'}  >
                <Textarea fontSize={'large'}
                    w={'500px'} h={'150px'}
                    size='lg'
                    border={'2px'}
                    onChange={handleTweetChange}
                    isInvalid={isInvalid}

                />

            </Flex>

            <Center>
                <Button disabled={isInvalid} colorScheme={'twitter'} justifySelf='flex-end' ml={'26rem'} mt={'1rem'}  >Tweet</Button>
            </Center>

            <Center display={isInvalid ? 'flex' : 'none'}>
                <Alert w={'400px'} mt={5} status='error'>
                    <AlertIcon />
                    <AlertDescription>Max Length of Tweet should be 50 characters</AlertDescription>
                </Alert>
            </Center>


            <Tweet />




        </>
    )
}

export default Social