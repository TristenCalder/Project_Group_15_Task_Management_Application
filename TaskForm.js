import React, {useState} from 'react';
import axios from 'axios';
import './taskform.css';

// Form stuff
const TaskForm = ({onPostCreated}) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        due_date: ''
    });

    // Form logic
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    // Form submission logic
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/tasks', formData); // Updated endpoint
            onPostCreated(response.data);
            setFormData({title: '', content: '', category: '', due_date: ''});
        } catch (error) {
            alert('FAIL');
        }
    };

    // Form to intake data
    return (
        <div className="postForm-container">
            <div className="postForm">
                <h2>Create Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" name="title" onChange={handleChange}
                               value={formData.title} required/>
                    </div>
                    <div className="form-group">
                        <label>Content:</label>
                        <textarea name="content" onChange={handleChange}
                                  value={formData.content} required/>
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <select name="category" onChange={handleChange}
                                value={formData.category} required>
                            <option value="Web Programming">Web Programming</option>
                            <option value="Other Programming">Other Programming</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Due Date:</label>
                        <input type="date" name="due_date" onChange={handleChange}
                               value={formData.due_date} required/>
                    </div>
                    <button type="submit">Create Post</button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;