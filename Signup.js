import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './signup.css';

// Form stuff
const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        age: '',
        occupation: '',
        city: ''
    });
    const navigate = useNavigate();

    // Form logic
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    // Form submission logic
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/signup', formData);
            if (response.data.success) {
                navigate('/signin');
            } else {
                alert('FAIL');
            }
        } catch (error) {
            alert('FAIL');
        }
    };

    //   Form to intake data
    return (
        <div className="signup-form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label>Username:</label>
                <input type="text" name="name" value={formData.name}
                       onChange={handleChange} required/>
                <label>Password:</label>
                <input type="password" name="password" value={formData.password}
                       onChange={handleChange} required/>
                <label>Age:</label>
                <input type="number" name="age" value={formData.age}
                       onChange={handleChange}/>
                <label>Occupation:</label>
                <input type="text" name="occupation" value={formData.occupation}
                       onChange={handleChange}/>
                <label>City:</label>
                <input type="text" name="city" value={formData.city}
                       onChange={handleChange}/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default Signup;
