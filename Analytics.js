import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Analytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log('Analytics component mounted');
        const fetchAnalytics = async () => {
            try {
                const response = await axios.get('/api/user-analytics');
                console.log('Analytics data received:', response.data);

                // Convert the received data into appropriate numerical types
                const data = {
                    average_rating: parseFloat(response.data.average_rating) || 0,
                    tasks_completed: parseInt(response.data.tasks_completed, 10) || 0,
                    tasks_created: parseInt(response.data.tasks_created, 10) || 0,
                    avg_stars_assigned: parseFloat(response.data.avg_stars_assigned) || 0,
                };

                setAnalytics(data);
            } catch (error) {
                console.error('Error fetching analytics:', error);
                setError(true);
            }
        };

        fetchAnalytics();
    }, []);

    if (error) {
        return <div style={{ color: '#f5f5f5', textAlign: 'center', padding: '20px' }}>Failed to load analytics.</div>;
    }

    if (!analytics) {
        return <div style={{ color: '#f5f5f5', textAlign: 'center', padding: '20px' }}>Loading...</div>;
    }

    return (
        <div style={{ color: '#f5f5f5', textAlign: 'center', padding: '20px' }}>
            <h2>Analytics</h2>
            <p><strong>Average Rating:</strong> {analytics.average_rating.toFixed(2)}</p>
            <p><strong>Tasks Completed:</strong> {analytics.tasks_completed}</p>
            <p><strong>Tasks Created:</strong> {analytics.tasks_created}</p>
            <p><strong>Average Stars on Assigned Tasks:</strong> {analytics.avg_stars_assigned.toFixed(2)}</p>
        </div>
    );
};

export default Analytics;