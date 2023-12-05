import { TaskListProps } from "./interfaces";
import { TaskItem } from "./task-item";
import '../styles/task.css'

export const TaskList: React.FC<TaskListProps> = ({ tasks, finishTask, deleteTask }) => (
    <div className='task'>
        {tasks.length === 0 ? <span>у вас пока нет задач</span> : tasks.map(task => (
            <TaskItem key={task._id} task={task} finishTask={finishTask} deleteTask={deleteTask} />
        ))}
    </div>
);