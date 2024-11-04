import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../components/AuthContext'; 
import { useMessage } from '../components/SetMessage';

// Register component
const Register = () => {
    const { login } = useAuth();
    const { setMessage } = useMessage(); 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ou, setOu] = useState('');

    // function to handle registration when the button is clicked
    const handleRegister = async () => {
        try {

            // sending POST request to register the user
            const response = await axios.post('http://localhost:3001/api/user/register', {
                username,
                password,
                ou,
            });
            localStorage.setItem('token', response.data.token);
            login(); 
            setMessage(response.data.message); 

            alert('Registration successful!');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Server error');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="OU ID" onChange={(e) => setOu(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

// exporting Register component to be used in other parts of the app
export default Register;
