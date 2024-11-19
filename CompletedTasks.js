import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './completedtasks.css';

const CompletedTasks = () => {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchCompletedTasks = async () => {
            try {
                const response = await axios.get('/api/profile/completed-tasks');
                setCompletedTasks(response.data);
            } catch (error) {
                setError(true);
            }
        };

        fetchCompletedTasks();
    }, []);

    if (error) {
        return <div>Failed to load completed tasks.</div>;
    }

    return (
        <div className="completed-tasks-container">
            <h2>Completed Tasks</h2>
            <div className="completed-tasks-list">
                {completedTasks.length > 0 ? (
                    completedTasks.map(task => (
                        <div key={task.blog_id} className="completed-task">
                            <h4>{task.title}</h4>
                            <p>{task.body}</p>
                            <p><strong>Category:</strong> {task.category}</p>
                            <p><strong>Completed on:</strong> {new Date(task.date_created).toLocaleDateString()}</p>
                            {task.due_date && (
                                <p><strong>Due Date:</strong> {new Date(task.due_date).toLocaleDateString()}</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No completed tasks to show.</p>
                )}
            </div>
        </div>
    );
};

export default CompletedTasks;