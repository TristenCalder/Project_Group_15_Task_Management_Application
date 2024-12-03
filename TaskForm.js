import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './taskform.css';
import { useNavigate } from 'react-router-dom';

const TaskForm = ({ onTaskCreated }) => {

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

    // Fetch available users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/users');
                setUsers(response.data);
            } catch (error) {
                alert('Failed to fetch users.');
            }
        };

        fetchUsers();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/tasks', formData);
            onTaskCreated(response.data);
            setFormData({ title: '', content: '', priority: '', due_date: '', assigned_to: '', progress: 0 });
            navigate('/tasks');
        } catch (error) {
            alert('Task creation failed.');
        }
    };

    return (
        <div className="postForm-container">
            <div className="postForm">
                <h2>Create Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Content:</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Priority:</label>
                        <select name="priority" onChange={handleChange} value={formData.priority} required>
                            <option value="">Select Priority</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Due Date:  </label>
                        <input
                            type="date"
                            name="due_date"
                            value={formData.due_date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Assign To:</label>
                        <select name="assigned_to" onChange={handleChange} value={formData.assigned_to} required>
                            <option value="">Select User</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Progress:</label>
                        <input
                            type="range"
                            name="progress"
                            min="0"
                            max="100"
                            value={formData.progress}
                            onChange={handleChange}
                        />
                        <span>{formData.progress}%</span>
                    </div>
                    <button type="submit">Create Task</button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;