import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './edittask.css';

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        priority: '',
        due_date: '',
        assigned_to: '',
        progress: 0
    });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`/api/tasks/${id}`);
                const { title, body, priority, due_date, assigned_to_user_id, progress } = response.data;
                setFormData({
                    title,
                    content: body,
                    priority,
                    due_date: due_date.substring(0, 10),
                    assigned_to: assigned_to_user_id,
                    progress
                });
            } catch (error) {
                alert('Failed to load task');
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data);
            } catch (error) {
                alert('Failed to fetch users.');
            }
        };

        fetchTask();
        fetchUsers();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/tasks/${id}`, {
                title: formData.title,
                content: formData.content,
                priority: formData.priority,
                due_date: formData.due_date,
                assigned_to: formData.assigned_to,
                progress: formData.progress,
            });
            navigate('/tasks');
        } catch (error) {
            console.error('FAILED', error.response || error.message);
            alert('FAILED');
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

                <label>Priority:</label>
                <select name="priority" onChange={handleChange} value={formData.priority} required>
                    <option value="">Select Priority</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <label>Due Date:</label>
                <input type="date" name="due_date" onChange={handleChange}
                       value={formData.due_date} required/>

                <label>Assign To:</label>
                <select name="assigned_to" onChange={handleChange} value={formData.assigned_to} required>
                    <option value="">Select User</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>

                <label>Progress:</label>
                <input type="range" name="progress" min="0" max="100" onChange={handleChange}
                       value={formData.progress} required/>
                <span>{formData.progress}%</span>

                <button type="submit">Update Task</button>
            </form>
        </div>
    );
};

export default EditTask;