import React, { useState } from 'react';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateBlog() {
    const [formData, setFormData] = useState({})
    const [publishError, setPublishError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data to be sent:', formData); // Debug log
    
        try {
            const res = await axios.post('http://localhost:3000/api/blog/create', formData);
    
            // If the request is successful, the status code is 2xx
            if (res.status === 200) {
                setPublishError(null);
                // navigate(`blog/${res.data.id}`);
            } else {
                setPublishError(res.data.message || 'Something went wrong');
            }
        } catch (err) {
            console.error('Fetch error:', err.message);
            setPublishError(err.response?.data?.message || 'Failed to publish blog. Please try again later.');
        }
    };
    
    
    

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className="text-center text-3xl my-7 font-semibold">Write</h1>
            <form 
                className='flex flex-col gap-4'
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput
                        type='text'
                        placeholder='Title'
                        required
                        id='title'
                        className='flex-1'
                        onChange={
                            (e) => setFormData({ ...formData, title: e.target.value})
                        }
                    />
                </div>
                <div className="mb-4">
                    <Select
                        onChange={(e) => 
                            setFormData({ ...formData, category: e.target.value})
                        }
                    >
                        <option value='uncategorized'>Select a category</option>
                        <option value='sports'>Sports</option>
                        <option value='politics'>Politics</option>
                    </Select>
                </div>
                {/* <div className="mb-4">
                    <FileInput 
                        type='file'
                        accept='image/*'
                        onChange={(e) => setFormData({ ...formData, image: e.target.value})}
                    />
                    <Button
                        type='button'
                        gradientDuoTone='purpleToBlue'
                        size='sm'
                        outline
                        className='mt-2'
                    >
                        Upload Image
                    </Button>
                </div> */}
                <div className="mb-4">
                    <ReactQuill
                        theme='snow'
                        placeholder='Write something...'
                        className='h-72'
                        onChange={(value) => {
                            setFormData({ ...formData, content: value });
                        }}
                        required
                    />
                </div>
                <Button type='submit' gradientDuoTone='purpleToPink'>
                    Publish
                </Button>
                {publishError && (
                    <Alert className='mt-5' color='failure'>
                        {publishError}
                    </Alert>
                )}
            </form>
        </div>
    );
}

export default CreateBlog;
