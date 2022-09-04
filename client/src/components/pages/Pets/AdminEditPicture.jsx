import React from 'react'
import {Button, Input, Tooltip, Alert, AlertIcon, AlertTitle} from '@chakra-ui/react'
import { useState, useRef } from 'react'
import axios from 'axios'

function AdminEditPicture(props) {
    const { pet } = props
    const fileInputRef = useRef()
    const [fileName, setFileName] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState('')

    const handleClick = () => fileInputRef.current.click()

    const handleFileChange = async (event) => {

        try {
            const fileObj = event.target.files && event.target.files[0]
            setFileName(fileObj.name)
            const formData = new FormData();
            formData.append("photo", fileObj);
            const res = await axios.patch(`http://localhost:8080/api/v1/pets/${pet._id}/photo`, formData, {
                headers: {
                    "content-type": "multipart/form-data"
                },
                withCredentials: true
            });

            window.location.reload()

        } catch (err) {
            console.log(err)
            setStatus('error')
            setMessage('Something Went Wrong')
        }
    };

    return (
        <>
            <Input onChange={handleFileChange} ref={fileInputRef} type={'file'} display='none' />

            <Tooltip label={fileName} aria-label='A tooltip'>
                <Button ml={'20px'} onClick={handleClick} colorScheme='twitter'>Change Picture</Button>
            </Tooltip>

            {message && <Alert status={status} position={'absolute'} bottom={-10}>
                <AlertIcon />
                <AlertTitle> {message}</AlertTitle>
            </Alert>}
        </>

    )
}
export default AdminEditPicture