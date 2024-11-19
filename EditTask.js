import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './edittask.css'; // Ensure CSS is correctly referenced

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        due_date: '' // Ensure this matches your new task schema
    });

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`/api/tasks/${id}`); // Ensure the endpoint matches
                setFormData({
                    title: response.data.title,
                    content: response.data.body,
                    category: response.data.category,
                    due_date: response.data.due_date,
                });
            } catch (error) {
                alert('Failed to load task');
            }
        };

        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/tasks/${id}`, { // Ensure the endpoint matches
                title: formData.title,
                content: formData.content,
                category: formData.category,
                due_date: formData.due_date,
            });
            navigate('/tasks');
        } catch (error) {
            console.error('Error updating task:', error.response || error.message);
            alert('Failed to update task');
        }
    };

    return (
        <div className="edit-form-container">
            <h2>Edit Task</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" name="title" onChange={handleChange}
                       value={formData.title} required/>

                <label>Content:</label>
                <textarea name="content" onChange={handleChange}
                          value={formData.content} required/>

                <label>Category:</label>
                <select name="category" onChange={handleChange}
                        value={formData.category} required>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Other">Other</option>
                </select>

                <label>Due Date:</label>
                <input type="date" name="due_date" onChange={handleChange}
                       value={formData.due_date} required/>

                <button type="submit">Update Task</button>
            </form>
        </div>
    );
};

export default EditTask;