export interface ToDo {
    _id: string;
    name: string;
    isDone: boolean;
}

export interface UserData {
    login: string;
    firstName: string;
    lastName: string;
}

export interface UserState {
    token: string | null;
    isAuthenticated: boolean;
}

export interface TaskListProps {
    tasks: ToDo[];
    finishTask: (id: string) => void;
    deleteTask: (id: string) => void;
}

export interface TaskItemProps {
    task: ToDo;
    finishTask: (id: string) => void;
    deleteTask: (id: string) => void;
}

export interface TaskInputProps {
    task: string;
    setTask: React.Dispatch<React.SetStateAction<string>>;
    sendTask: () => void;
}

export interface UserState {
    token: string | null;
    isAuthenticated: boolean;
}

export interface HeaderProps {
    toggleChat: () => void;
}