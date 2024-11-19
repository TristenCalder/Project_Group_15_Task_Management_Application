import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import './tasklist.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

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
            await axios.post(`/api/update-task/${id}`, { completed: !completed });
            setTasks(tasks.map(task =>
                task.blog_id === id ? { ...task, completed: !completed } : task
            ));
        } catch {
            alert('FAIL');
        }
    }

    const addNewTask = (newTask) => {
        setTasks([newTask, ...tasks]);
    };

    return (
        <div className="task-list-container">
            <h2>All Tasks</h2>
            <div className="taskForm-wrapper">
                <TaskForm onTaskCreated={addNewTask}/>
            </div>
            <div className="tasks">
                {tasks.map(task => (
                    <div key={task.blog_id} className={`task ${task.completed ? 'completed' : ''}`}>
                        <h3>{task.title}</h3>
                        <p>by {task.creator_name} on {new Date(task.date_created).toLocaleDateString()}</p>
                        <p>{task.body}</p>
                        <p>Category: {task.category}</p>
                        <p>Due Date: {task.due_date ? new Date(task.due_date).toLocaleDateString() : 'N/A'}</p>
                        {task.overdue && !task.completed && <p className="overdue-indicator">This task is overdue!</p>}

                        <div className="task-action-buttons">
                            <button onClick={() => handleCompletionToggle(task.blog_id, task.completed)} className="toggle-completion-button">
                                {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                            </button>
                            {currentUser && currentUser.user_id === task.creator_user_id && (
                                <>
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