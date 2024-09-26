import React, { useState, useRef } from 'react';
import { Alert, Button, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateBlog() {
    const [formData, setFormData] = useState({});
    const quillRef = useRef(null); // Ref for ReactQuill instance
    const navigate = useNavigate();

    // Image Handler for React Quill
    const handleImageUpload = async () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];

            if (file) {
                // Create a FormData to send the image to the server
                const data = new FormData();
                data.append('image', file);

                try {
                    const res = await axios.post('http://localhost:3000/api/upload', data, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    // If the image is uploaded successfully, insert it into the editor
                    if (res.status === 200) {
                        const imageUrl = res.data.url; // Assuming your backend returns the image URL
                        const editor = quillRef.current.getEditor(); // Get the editor instance
                        const range = editor.getSelection();
                        editor.insertEmbed(range.index, 'image', imageUrl);
                    }
                } catch (error) {
                    console.error('Error uploading image:', error);
                    toast.error('Failed to upload image. Please try again.');
                }
            }
        };
    };

    // Quill modules for toolbar customization
    const modules = {
        toolbar: {
            container: [
                [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['bold', 'italic', 'underline', 'blockquote'],
                ['link', 'image', 'video'],
                [{ 'align': [] }],
                ['clean'],
            ],
            handlers: {
                image: handleImageUpload, // Custom image handler
            },
        },
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.content || formData.content.length === 0) {
            toast.error('Write the content first');
            return;
        }

        try {
            const res = await axios.post('http://localhost:3000/api/blog/create', formData);

            if (res.status === 201) {
                navigate('/');
                toast.success('Blog published successfully!');
            } else {
                const errorMessage = res.data.message || 'Something went wrong';
                toast.error(errorMessage);
            }
        } catch (err) {
            console.error('Fetch error:', err.message);
            const errorMessage = err.response?.data?.message || 'Failed to publish blog. Please try again later.';
            toast.error(errorMessage);
        }
    };

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <ToastContainer />
            <h1 className="text-center text-3xl my-7 font-semibold">Write</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                {/* Title Input */}
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput
                        type='text'
                        placeholder='Title'
                        required
                        id='title'
                        className='flex-1'
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                {/* Category Select */}
                <div className="mb-4">
                    <Select onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        <option value='uncategorized'>Select a category</option>
                        <option value='sports'>Sports</option>
                        <option value='politics'>Politics</option>
                    </Select>
                </div>

                {/* Content Editor */}
                <div className="mb-4">
                    <ReactQuill
                        ref={quillRef} // Attach ref to Quill editor
                        theme='snow'
                        placeholder='Write something...'
                        className='h-72'
                        modules={modules} // Pass custom modules
                        onChange={(value) => setFormData({ ...formData, content: value })}
                        required
                    />
                </div>

                {/* Submit Button */}
                <Button type='submit' gradientDuoTone='purpleToPink'>
                    Publish
                </Button>
            </form>
        </div>
    );
}

export default CreateBlog;
