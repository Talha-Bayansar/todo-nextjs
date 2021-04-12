import { useState, useContext, createContext } from "react";

const TaskContext = createContext();

export function TaskProvider(props) {
    const [taskToEdit, setTaskToEdit] = useState({});
    const [taskToDelete, setTaskToDelete] = useState({});
    const [isDelete, setIsDelete] = useState(false);
    const [allTasks, setAllTasks] = useState([]);
    const [todayTasks, setTodayTasks] = useState([]);

    const api = {
        taskToEdit,
        setTaskToEdit,
        isDelete,
        setIsDelete,
        taskToDelete,
        setTaskToDelete,
        allTasks,
        setAllTasks,
        todayTasks,
        setTodayTasks,
    };

    return (
        <TaskContext.Provider value={api}>
            {props.children}
        </TaskContext.Provider>
    );
}
export const useTask = () => useContext(TaskContext);
