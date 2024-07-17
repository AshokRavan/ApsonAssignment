import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', {
                username,
                password
            });
            console.log(res.data); // Token response
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={e => onSubmit(e)}>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={e => onChange(e)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                    minLength="6"
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
