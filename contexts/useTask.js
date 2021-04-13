import { useState, useContext, createContext, useEffect } from "react";

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

    function updateTask(task) {
        let newArray = allTasks;
        for (const i in newArray) {
            if (newArray[i].id === task.id) {
                newArray[i] = task;
            }
        }
        setAllTasks(newArray);
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
        updateTask,
    };

    return (
        <TaskContext.Provider value={api}>
            {props.children}
        </TaskContext.Provider>
    );
}
export const useTask = () => useContext(TaskContext);
