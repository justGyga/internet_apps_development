import React from 'react';
import '../styles/header.css';
import { HeaderProps } from './interfaces';

export const Header: React.FC<HeaderProps> = ({ toggleChat }) => (
    <div className='menu'>
        <span className='title'>ToDo</span>
        <button className='orange-button' onClick={toggleChat}>Чат</button>
    </div>
);
