import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './signin.css';

// Sign in form
const Signin = () => {
    const [formData, setFormData] = useState({name: '', password: ''});
    const navigate = useNavigate();

    // Form logic
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    //
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/signin', formData);
            if (response.data.success) {
                sessionStorage.setItem('isAuthenticated', 'true');
                sessionStorage.setItem('user_id', response.data.user_id);
                navigate('/tasks');
            } else {
                alert('WRONG!');
            }
        } catch (error) {
            alert('FAIL');
        }
    };

    // Form to intake data
    return (
        <div className="signin-container">
            <div className="signin-box">
                <h2 className="signin-header">Sign In</h2>
                <form className="signin-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label"
                               htmlFor="username">Username:</label>
                        <input type="text" name="name" id="username"
                               className="form-input" value={formData.name}
                               onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label className="form-label"
                               htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password"
                               className="form-input" value={formData.password}
                               onChange={handleChange} required/>
                    </div>
                    <button type="submit" className="signin-button">Sign In
                    </button>
                </form>
                <p className="signup-prompt">
                    Don't have an account?{' '}
                    <button className="signup-link-button"
                            onClick={() => navigate('/signup')}>Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signin;
