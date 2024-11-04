import React, { useState } from 'react';
import axios from 'axios';

// AssignUser component
const AssignUser = ({ setMessage }) => {
    const [userId, setUserId] = useState('');
    const [divisionId, setDivisionId] = useState('');

    // function to handle assigning a user to a division
    const handleAssignUser = async () => {
        const token = localStorage.getItem('token');
        try {

            // send a post request to assign the user to a division
            const response = await axios.post('http://localhost:3001/api/user-assignment/assign-user', {
                userId,
                divisionId,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage(response.data.message);
            setUserId('');
            setDivisionId('');

            alert('user assignment successful!');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Server error');
        }
    };

    // render the form to assign a user to a division
    return (
        <div>
            <h2>Assign User to Division</h2>
            <input type="text" placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
            <input type="text" placeholder="Division ID" onChange={(e) => setDivisionId(e.target.value)} />
            <button onClick={handleAssignUser}>Assign User</button>
        </div>
    );
};

// Export the AssignUser component to be used in other parts of the app
export default AssignUser;
