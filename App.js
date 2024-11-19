import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from 'react-router-dom';
import Header from './Header';
import Signin from './Signin';
import Signup from './Signup';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import EditTask from './EditTask';
import MyProfile from './MyProfile';
import AccountSettings from './AccountSettings';
import CompletedTasks from './CompletedTasks';
import Analytics from './Analytics';
import './App.css';

function App() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Navigate to="/signin"/>}/>
                <Route path="/signin" element={<Signin/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/create" element={<TaskForm/>}/>
                <Route path="/tasks" element={<TaskList/>}/>
                <Route path="/edit/:id" element={<EditTask/>}/>
                <Route path="/profile" element={<MyProfile/>}/>
                <Route path="/account" element={<AccountSettings/>}/>
                <Route path="/completed-tasks" element={<CompletedTasks/>}/>
                <Route path="/analytics" element={<Analytics/>}/>
            </Routes>
        </Router>
    );
}


export default App;