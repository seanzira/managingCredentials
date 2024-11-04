import React, { useState } from 'react';
import axios from 'axios';

// AddCredential component
const AddCredential = ({ setMessage }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [service, setService] = useState('');
    const [divisionId, setDivisionId] = useState('');

    // function to handle adding a credential
    const handleAddCredential = async () => {

        // retrieve JWT from storage
        const token = localStorage.getItem('token');
        try {

            // send post request to add a new credential
            const response = await axios.post('http://localhost:3001/api/credential/add-credential', {
                username,
                password,
                service,
                divisionId,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage(response.data.message);
            setUsername('');
            setPassword('');
            setService('');
            setDivisionId('');

            // alert the user when successful
            alert('Credential successfully added!');
        } catch (error) {

            // alert the user when unsuccessful
            alert('Credential unsuccessfully added!');
        }
    };

    // render the form to add a credential
    return (
        <div>
            <h2>Add Credential</h2>
            <input type="text" placeholder="Credential Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Credential Password" onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="Service" onChange={(e) => setService(e.target.value)} />
            <input type="text" placeholder="Division ID" onChange={(e) => setDivisionId(e.target.value)} />
            <button onClick={handleAddCredential}>Add Credential</button>
        </div>
    );
};

// export the AddCredential component to be used in other parts of the app
export default AddCredential;
