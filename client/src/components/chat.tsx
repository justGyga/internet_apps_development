import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import '../styles/chat.css';
import axios from 'axios';
import { UserData } from './interfaces';

const socket = io('http://localhost:8000');
const host = 'http://localhost:5000'

export const ChatComponent = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [userData, setUserData] = useState<UserData>({ login: '', firstName: '', lastName: '' });
    
    useEffect(() => {
        if (userData.login === '') {
            getMe();
        }
    }, [userData.login]); // Зависимость от userData.login
    
    useEffect(() => {
        socket.on('chat message', (msg: string) => {
            setMessages(prevMessages => [...prevMessages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    const sendMessage = () => {
        if (currentMessage != '') {
            socket.emit('chat message', `${userData.login}: ${currentMessage}`);
            setCurrentMessage('');
        }
    };

    const getMe = () => {
        axios.get(`${host}/user`)
            .then(response => setUserData(response.data))
            .catch(err => console.error(err));
    }

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <div className="chat-input-container">
                <input
                    className="chat-input"
                    type="text"
                    value={currentMessage}
                    onChange={e => setCurrentMessage(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage} className='orange-button'>Отправить</button>
            </div>
        </div>
    );
};
