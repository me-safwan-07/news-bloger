import React, { useState } from 'react';
import { Button, Select, TextInput } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateBlog() {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        content: '',
    });
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    // Quill modules for toolbar customization
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['image', 'video'],
          ['clean']
        ],
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content || content.length === 0) {
            toast.error('Write the content first');
            return;
        }

        // Prepare the data to be sent
        const blogData = {
            title: formData.title,
            category: formData.category,
            content: content,  // Assign Quill editor content to formData
        };

        try {
            const res = await axios.post('http://localhost:3000/api/blog/create', blogData);

            if (res.status === 201) {
                const blogId = res.data.blogId;
                toast.success('Blog published successfully!');
                navigate('/');
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
                <Button type='submit' gradientDuoTone='purpleToPink' className='text-black'>
                    Publish
                </Button>
                {/* Title Input */}
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput
                        type='text'
                        placeholder='Enter title'
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
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        theme="snow"
                    />
                </div>

                {/* Submit Button */}
                
            </form>
        </div>
    );
}

export default CreateBlog;
