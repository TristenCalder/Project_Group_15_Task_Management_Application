import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './myprofile.css';

const MyProfile = () => {
    const [user, setUser] = useState({});
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const userResponse = await axios.get('/api/account');
                setUser(userResponse.data);
            } catch {
                setError(true);
            }
        };

        const fetchUserTasks = async () => {
            try {
                const tasksResponse = await axios.get('/api/user-tasks');
                setTasks(tasksResponse.data);
            } catch {
                setError(true);
            }
        };

        fetchProfileData();
        fetchUserTasks();
    }, []);

    if (error) {
        return <div className="profile-error">Failed to load profile data.</div>;
    }

    return (
        <div className="profile-wrapper">
            <h2 className="profile-header">My Profile</h2>
            <div className="profile-details">
                <div className="profile-card">
                    <p><strong>Username:</strong> {user.name || 'N/A'}</p>
                    <p><strong>Age:</strong> {user.age || 'N/A'}</p>
                    <p><strong>Occupation:</strong> {user.occupation || 'N/A'}</p>
                    <p><strong>City:</strong> {user.city || 'N/A'}</p>
                </div>
            </div>

            <h3 className="profile-tasks-header">My Tasks</h3>
            <div className="profile-task-list">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <div
                            key={task.blog_id}
                            className={`profile-task ${task.completed ? 'profile-task-completed' : ''} ${task.overdue ? 'profile-task-overdue' : ''}`}
                        >
                            <h3>{task.title}</h3>
                            <p>by {task.creator_name} on {new Date(task.date_created).toLocaleDateString()}</p>
                            <p>{task.body}</p>
                            <p>Priority: {task.priority}</p>
                            <p>Due Date: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}</p>
                            <p>Assigned To: {task.assigned_to_user_name || 'Unassigned'}</p>

                            {task.overdue && !task.completed && <p className="profile-overdue-indicator">This task is overdue!</p>}
                            {task.completed && <p className="profile-completed-indicator">This task is completed!</p>}
                        </div>
                    ))
                ) : (
                    <p className="profile-no-tasks">No tasks to show.</p>
                )}
            </div>
        </div>
    );
};

export default MyProfile;