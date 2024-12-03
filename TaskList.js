import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import StarRating from './StarRating';
import './tasklist.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [sortCriteria, setSortCriteria] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksResponse = await axios.get('/api/tasks');
                setTasks(tasksResponse.data);
            } catch {
                alert('FAIL');
            }
        };

        const fetchUser = async () => {
            try {
                const userResponse = await axios.get('/api/current-user');
                setCurrentUser(userResponse.data);
            } catch {
                alert('FAIL');
            }
        };

        fetchTasks();
        fetchUser();
    }, []);

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
        sortTasks(e.target.value);
    };

    const sortTasks = (criteria) => {
        let sortedTasks = [...tasks];
        switch (criteria) {
            case 'completed':
                sortedTasks.sort((a, b) => a.completed - b.completed);
                break;
            case 'due_date':
                sortedTasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
                break;
            case 'overdue':
                sortedTasks.sort((a, b) => (b.overdue ? 1 : 0) - (a.overdue ? 1 : 0));
                break;
            case 'assigned_to':
                sortedTasks.sort((a, b) => (a.assigned_to_user_name || '').localeCompare(b.assigned_to_user_name || ''));
                break;
            case 'created_by':
                sortedTasks.sort((a, b) => a.creator_name.localeCompare(b.creator_name));
                break;
            default:
                return;
        }
        setTasks(sortedTasks);
    };

    const handleDelete = async (id) => {
        try {
            await axios.post(`/api/delete-post/${id}`);
            setTasks(tasks.filter(task => task.blog_id !== id));
        } catch {
            alert('FAIL');
        }
    };

    const handleEdit = (id) => {
        window.location.href = `/edit/${id}`;
    };

    const handleCompletionToggle = async (id, completed) => {
        try {
            const newCompletedStatus = !completed;
            const newProgressValue = newCompletedStatus ? 100 : 0;

            await axios.post(`/api/update-task/${id}`, {
                completed: newCompletedStatus,
                progress: newProgressValue
            });

            setTasks(tasks.map(task =>
                task.blog_id === id ? { ...task, completed: newCompletedStatus, progress: newProgressValue } : task
            ));
        } catch {
            alert('FAIL');
        }
    };

    const handleStarRatingChange = async (id, newRating) => {
        try {
            await axios.put(`/api/update-task/${id}`, { star_rating: newRating });
            setTasks(tasks.map(task =>
                task.blog_id === id ? { ...task, star_rating: newRating } : task
            ));
        } catch {
            alert('FAIL');
        }
    };

    const handleProgressChange = async (id, newProgress) => {
        try {
            await axios.post(`/api/update-task/${id}`, { progress: newProgress });

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.blog_id === id ? { ...task, progress: newProgress } : task
                )
            );
        } catch (error) {
            console.error('FAIL', error);
        }
    };

    return (
        <div className="task-list-container">
            <h2>All Tasks</h2>
            <div className="taskForm-wrapper">
                <TaskForm onTaskCreated={(newTask) => {
                    setTasks(prevTasks => [newTask, ...prevTasks]);
                }} />
            </div>

            <div className="sorting-options">
                <label htmlFor="sort">Sort by:</label>
                <select id="sort" value={sortCriteria} onChange={handleSortChange}>
                    <option value="">Select</option>
                    <option value="completed">Completed/Uncompleted</option>
                    <option value="due_date">Due Date</option>
                    <option value="overdue">Overdue/Not Overdue</option>
                    <option value="assigned_to">Assigned To</option>
                    <option value="created_by">Created By</option>
                </select>
            </div>

            <div className="tasks">
                {tasks.map(task => (
                    <div key={task.blog_id} className={`task ${task.completed ? 'completed' : ''} ${task.overdue ? 'overdue' : ''}`}>
                        <h3>{task.title}</h3>
                        <p>by {task.creator_name} on {new Date(task.date_created).toLocaleDateString()}</p>
                        <p>{task.body}</p>
                        <p>Priority: {task.priority}</p>
                        <p>Due Date: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}</p>
                        <p>Assigned To: {task.assigned_to_user_name || 'Unassigned'}</p>

                        {currentUser && currentUser.user_id === task.assigned_to_user_id && (
                            <div>
                                <label>Progress:</label>
                                <input
                                    type="range"
                                    value={task.progress}
                                    onChange={(e) => handleProgressChange(task.blog_id, e.target.value)}
                                    min="0"
                                    max="100"
                                />
                                <span>{task.progress}%</span>
                            </div>
                        )}

                        {task.completed && currentUser && currentUser.user_id === task.creator_user_id && (
                            <div className="star-rating">
                                <StarRating
                                    rating={task.star_rating}
                                    onRatingChange={(newRating) => handleStarRatingChange(task.blog_id, newRating)}
                                />
                            </div>
                        )}

                        {task.overdue && !task.completed && <p className="overdue-indicator">This task is overdue!</p>}

                        <div className="task-action-buttons">
                            {currentUser && (currentUser.user_id === task.creator_user_id || currentUser.user_id === task.assigned_to_user_id) && (
                                <>
                                    <button onClick={() => handleCompletionToggle(task.blog_id, task.completed)} className="toggle-completion-button">
                                        {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                                    </button>
                                    <button onClick={() => handleEdit(task.blog_id)} className="edit-button">Edit</button>
                                    <button onClick={() => handleDelete(task.blog_id)} className="delete-button">Delete</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskList;