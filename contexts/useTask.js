import { useState, useContext, createContext, useEffect } from "react";

const TaskContext = createContext();

export function TaskProvider(props) {
    const [taskToEdit, setTaskToEdit] = useState({});
    const [taskToDelete, setTaskToDelete] = useState({});
    const [isDelete, setIsDelete] = useState(false);
    const [isSelectedTask, setIsSelectedTask] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});

    const api = {
        taskToEdit,
        setTaskToEdit,
        isDelete,
        setIsDelete,
        taskToDelete,
        setTaskToDelete,
        isSelectedTask,
        setIsSelectedTask,
        selectedTask,
        setSelectedTask,
    };

    return (
        <TaskContext.Provider value={api}>
            {props.children}
        </TaskContext.Provider>
    );
}
export const useTask = () => useContext(TaskContext);
