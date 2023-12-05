import * as React from 'react';
import { TaskInputProps } from './interfaces';
import '../styles/task-input.css'

export const TaskInput: React.FC<TaskInputProps> = ({ task, setTask, sendTask }) => (
    <div className='input-and-button'>
        <input
            type="text"
            placeholder='Введите задачу'
            title='Введите задачу'
            value={task}
            onChange={(e) => setTask(e.target.value)}
        />
        <button className='orange-button' onClick={sendTask}>Добавить задачу</button>
    </div>
);