import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TasksPage } from './pages/todos-page';
import { AuthenticationPage } from './pages/auth-page';
import { Route, Routes, useNavigate  } from "react-router-dom";
import { UserState } from './components/interfaces';

const host = "http://localhost:5000"

function App() {
  const [user, setUser] = useState<UserState>({ token: null, isAuthenticated: false });
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setUser({ token: storedToken, isAuthenticated: true });
      axios.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${storedToken}`;
        return config;
      });
      navigate('/tasks-page')
    } else {
      navigate('/authentication')
    }

  }, [navigate]);

  return (
    <body>
      <div>
        <Routes>
          <Route path='/authentication' element={<AuthenticationPage/>}></Route>
          <Route path='/tasks-page' element={<TasksPage/>}></Route>
        </Routes>
      </div >
    </body>
  );
}

export default App;
