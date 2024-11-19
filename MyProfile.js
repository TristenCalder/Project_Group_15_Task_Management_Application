import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './myprofile.css';

const MyProfile = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('/api/profile');
                setUser(response.data);
            } catch (error) {
                setError(true);
            }
        };
        fetchProfileData();
    }, []);

    if (error) {
        return <div>Failed to load profile data.</div>;
    }

    return (
        <div className="profile-container">
            <h2>My Profile</h2>
            <div className="profile-info">
                <p><strong>Username:</strong> {user.name || 'N/A'}</p>
                <p><strong>Age:</strong> {user.age || 'N/A'}</p>
                <p><strong>Occupation:</strong> {user.occupation || 'N/A'}</p>
                <p><strong>City:</strong> {user.city || 'N/A'}</p>
            </div>

            <h3>My Tasks</h3>
            <div className="profile-posts">
                {user.posts && user.posts.length > 0 ? (
                    user.posts.map(post => (
                        <div key={post.blog_id} className={`profile-post ${post.completed ? 'completed' : ''}`}>
                            <h4>{post.title}</h4>
                            <p>{post.body}</p>
                            <p><strong>Category:</strong> {post.category}</p>
                            <p><strong>Created on:</strong> {new Date(post.date_created).toLocaleDateString()}</p>
                            {post.due_date && (
                                <p><strong>Due Date:</strong> {new Date(post.due_date).toLocaleDateString()}</p>
                            )}
                            {post.overdue && !post.completed && <p className="overdue-indicator">This post is overdue!</p>}
                            {post.completed && <p className="completed-indicator">This task is completed!</p>}
                        </div>
                    ))
                ) : (
                    <p>No posts to show.</p>
                )}
            </div>
        </div>
    );
};

export default MyProfile;