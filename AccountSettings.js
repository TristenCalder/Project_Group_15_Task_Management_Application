import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './accountsettings.css';

// FOr the form data
const AccountSettings = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        age: '',
        occupation: '',
        city: ''
    });

// Get the user data (for filling in hte fileds with current data)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/account');
                setFormData({
                    name: response.data.name || '',
                    password: '',
                    age: response.data.age || '',
                    occupation: response.data.occupation || '',
                    city: response.data.city || ''
                });
            } catch (error) {
                alert('FAIL');
            }
        };
        fetchUserData();
    }, []);

    // Logic for updating the form
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

// Logic for updating the db
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/account', formData);
            if (response.data.success) {
                alert('Updated account');
            } else {
                alert('FAIL');
            }
        } catch (error) {
            alert('FAIL');
        }
    };

    // Form to intake data
    return (
        <div className="account-settings-container">
            <h2 className="account-settings-header">Account Settings</h2>
            <form className="account-settings-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Username:</label>
                    <input type="text" name="name" value={formData.name}
                           onChange={handleChange} required
                           className="form-input"/>
                </div>

                <div className="form-group">
                    <label className="form-label">Password:</label>
                    <input type="password" name="password"
                           value={formData.password} onChange={handleChange}
                           placeholder="Enter new password"
                           className="form-input"/>
                </div>

                <div className="form-group">
                    <label className="form-label">Age:</label>
                    <input type="number" name="age" value={formData.age}
                           onChange={handleChange} className="form-input"/>
                </div>

                <div className="form-group">
                    <label className="form-label">Occupation:</label>
                    <input type="text" name="occupation"
                           value={formData.occupation} onChange={handleChange}
                           className="form-input"/>
                </div>

                <div className="form-group">
                    <label className="form-label">City:</label>
                    <input type="text" name="city" value={formData.city}
                           onChange={handleChange} className="form-input"
                    />
                </div>

                <button type="submit" className="update-account-button">Update
                    Account
                </button>
            </form>
        </div>
    );
};

export default AccountSettings;
