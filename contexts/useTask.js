import { useState, useContext, createContext } from "react";

const TaskContext = createContext();

export function TaskProvider(props) {
    const [taskToEdit, setTaskToEdit] = useState({});
    const [taskToDelete, setTaskToDelete] = useState({});
    const [isDelete, setIsDelete] = useState(false);
    const [allTasks, setAllTasks] = useState([]);

    function addTask(task) {
        setAllTasks([...allTasks, task]);
    }

    function deleteTask(task) {
        setAllTasks(allTasks.filter((t) => t.id !== task.id));
    }

    const api = {
        taskToEdit,
        setTaskToEdit,
        isDelete,
        setIsDelete,
        taskToDelete,
        setTaskToDelete,
        allTasks,
        setAllTasks,
        addTask,
        deleteTask,
    };

    return (
        <TaskContext.Provider value={api}>
            {props.children}
        </TaskContext.Provider>
    );
}
export const useTask = () => useContext(TaskContext);
