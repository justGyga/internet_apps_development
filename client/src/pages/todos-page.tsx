import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Header } from '../components/header';
import { TaskList } from '../components/tasks-list';
import { TaskInput } from '../components/task-input';
import { UserState, ToDo } from '../components/interfaces';
import { ChatComponent } from '../components/chat';

const host = "http://localhost:5000"

export function TasksPage() {
    const [tasks, setTasks] = useState<ToDo[]>([]);
    const [task, setTask] = useState<string>("");
    const [user, setUser] = useState<UserState>({ token: null, isAuthenticated: false });
    const [showChat, setShowChat] = useState<boolean>(false);

    const toggleChat = () => {
        setShowChat(!showChat);
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setUser({ token: storedToken, isAuthenticated: true });
            axios.interceptors.request.use((config) => {
                config.headers.Authorization = `Bearer ${storedToken}`;
                return config;
            });
        }
        fetchTasks();
    }, [])

    const fetchTasks = () => {
        axios.get(`${host}/task/all`)
            .then(response => setTasks(response.data.tasks))
            .catch(err => console.error(err));
    };

    const finishTask = (id: string) => {
        axios.patch(`${host}/task/${id}`)
            .then(response => {
                setTasks(tasks.map(todo => todo._id === id ? { ...todo, isDone: !todo.isDone } : todo));
            })
            .catch(err => console.log(err))
    };

    const deleteTask = (id: string) => {
        axios.delete(`${host}/task/${id}`)
            .then(response => setTasks(tasks.filter(task => task._id !== id)))
            .catch(err => console.log(err))
    };

    const sendTask = () => {
        axios.post(`${host}/task/`, { name: task })
            .then((response) => setTasks([...tasks, { _id: response.data.taskId, name: task, isDone: false }]))
            .catch(err => console.log(err))
    }

    return (
        <div className='page'>
            <Header toggleChat={toggleChat}/>
            <div className='body'>
                <TaskList tasks={tasks} finishTask={finishTask} deleteTask={deleteTask} />
                <TaskInput task={task} setTask={setTask} sendTask={sendTask} />
            </div>
            {showChat && <ChatComponent />}
        </div>
    )
}