import React, { useState } from 'react';
import axios from 'axios';

// ChangeUserRole component
const ChangeUserRole = ({ setMessage }) => {
    const [userId, setUserId] = useState('');
    const [role, setRole] = useState('normal');

    // function to handle changing the user role
    const handleChangeUserRole = async () => {
        const token = localStorage.getItem('token');
        try {
            // sending put request to change the user's role
            const response = await axios.put(`http://localhost:3001/api/user/change-role/${userId}`, {
                role,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            setUserId('');
            setRole('normal');

            alert('User role changed successfully');
        } catch (error) {
            setMessage(error.response?.data?.message || 'User role not changed successfully.');
        }
    };

    // render the form to change a user's role
    return (
        <div>
            <h2>Change User Role</h2>
            <input type="text" placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
            <input type="text" placeholder="New Role" onChange={(e) => setRole(e.target.value)} />
            <button onClick={handleChangeUserRole}>Change Role</button>
        </div>
    );
};

// export the ChangeUserRole to be used in other parts of the app
export default ChangeUserRole;
