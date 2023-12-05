import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/form.css';
import { UserState } from '../components/interfaces';

const host = "http://localhost:5000"

export function AuthenticationPage() {
    const [user, setUser] = useState<UserState>({ token: null, isAuthenticated: false });
    const [loginData, setLoginData] = useState({ login: '', password: '' });
    const [registerData, setRegisterData] = useState({ login: '', password: '', firstName: '', lastName: '' });
    const navigation = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setUser({ token: storedToken, isAuthenticated: true });
            axios.interceptors.request.use((config) => {
                config.headers.Authorization = `Bearer ${storedToken}`;
                return config;
            });
        }
    }, []);
    const handleLogin = () => {
        axios.post(`${host}/user/authorization`, loginData)
            .then(response => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                setUser({ token, isAuthenticated: true });
                navigation("/tasks-page");
            })
            .catch(err => console.log(err));
    };

    const handleRegister = () => {
        axios.post(`${host}/user/registration`, registerData)
            .then(response => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                setUser({ token, isAuthenticated: true });
                navigation("/tasks-page");
            })
            .catch(err => console.log(err));
    };
    return (
        <div className='page'>
            <div className='form-wrapper'>
                <div className='form-container'>
                    <h2>Login</h2>
                    <input type="text" placeholder="Login" onChange={event => setLoginData({ ...loginData, login: event.target.value })} />
                    <input type="password" placeholder="Password" onChange={event => setLoginData({ ...loginData, password: event.target.value })} />
                    <button onClick={handleLogin}>Login</button>
                </div>
                <div className='form-container'>
                    <h2>Register</h2>
                    <input type="text" placeholder="Login" onChange={event => setRegisterData({ ...registerData, login: event.target.value })} />
                    <input type="password" placeholder="Password" onChange={event => setRegisterData({ ...registerData, password: event.target.value })} />
                    <input type="text" placeholder="First Name" onChange={event => setRegisterData({ ...registerData, firstName: event.target.value })} />
                    <input type="text" placeholder="Second Name" onChange={event => setRegisterData({ ...registerData, lastName: event.target.value })} />
                    <button onClick={handleRegister}>Register</button>
                </div>
            </div>
        </div>
    )
}