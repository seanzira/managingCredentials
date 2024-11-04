const React = require('react');
const { useEffect, useState } = require('react');
const axios = require('axios');
const { useMessage } = require('../components/SetMessage');

// Profile component
const Profile = () => {
    const { setMessage } = useMessage(); // Access setMessage from context
    const [User, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // useEffect to fetch user profile when component mounts
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');

                // sending GET request to fetch user profile
                const response = await axios.get('http://localhost:3001/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data); // Directly set user data
                setLoading(false);
            } catch (error) {
                setMessage(error.response?.data?.message || 'Error fetching profile');
                setLoading(false);
            }
        };

        // invoke function to fetch profile data
        fetchProfile();
    }, [setMessage]);

    // render loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // render if no user data is available
    if (!User) {
        return <div>No profile data available.</div>;
    }

    // render user profile information
    return (
        <div>
            <h2>Profile</h2>
            <p><strong>Username:</strong> {User.username}</p>
            <p><strong>Role:</strong> {User.role}</p>
            <p><strong>OU ID:</strong> {User.OU._id}</p>
        </div>
    );
};

// export Profile component for use in other files
export default Profile;
