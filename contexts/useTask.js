import { useState, useContext, createContext } from "react";

const TaskContext = createContext();

export function TaskProvider(props) {
    const [taskToEdit, setTaskToEdit] = useState({});

    const api = {
        taskToEdit,
        setTaskToEdit,
    };

    return (
        <TaskContext.Provider value={api}>
            {props.children}
        </TaskContext.Provider>
    );
}
export const useTask = () => useContext(TaskContext);
