import { TaskItemProps } from "./interfaces";
import '../styles/task-item.css'

export const TaskItem: React.FC<TaskItemProps> = ({ task, finishTask, deleteTask }) => (
    <div className={task.isDone ? 'stop' : 'todo'}>
        <button className='finish' onClick={() => finishTask(task._id)}>Выполнена</button>
        {task.name}
        <button className='delete' onClick={() => deleteTask(task._id)}>удалить</button>
        <hr />
    </div>
);