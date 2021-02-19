import React, { useEffect, useState } from "react";
import firebaseInit from "../db/firestore";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";

export const TaskCard = ({
    task,
    setEdit,
    setTitle,
    setDescription,
    setTaskId,
}) => {
    const [checked, setChecked] = useState(task.checked);
    const date = new Date(task.date.seconds * 1000).toString().slice(0, 16);
    const handleDelete = async () => {
        const firebase = await firebaseInit();
        await firebase.firestore().collection("tasks").doc(task.id).delete();
    };

    const checkTodo = async () => {
        if (task) {
            const firebase = await firebaseInit();
            await firebase.firestore().collection("tasks").doc(task.id).update({
                checked: checked,
            });
        }
    };

    useEffect(() => {
        checkTodo();
    }, [checked]);
    return (
        <div
            className={`rounded-xl bg-gray-100 m-6 max-w-sm p-4 shadow-mat ${
                checked && "opacity-50"
            }`}
        >
            <h1
                onChange={(e) => {
                    setTitle(e.target.value);
                }}
                className={`text-2xl ${checked && "line-through"}`}
            >
                {task.title}
            </h1>
            <p
                onChange={(e) => setDescription(e.target.value)}
                className={`mt-6 ${checked && "line-through"}`}
            >
                {task.description}
            </p>
            <div className="flex w-full items-center mt-6 justify-between">
                <span className="block text-gray-500 mr-8">{date}</span>
                <div className="flex">
                    <button
                        onClick={() => setChecked(!checked)}
                        className="focus:outline-none mx-1 outline-none block rounded-full bg-blue-500 text-gray-100 shadow-mat active:shadow-inner hover:shadow-inner p-2"
                    >
                        <CheckIcon />
                    </button>
                    <button
                        onClick={() => {
                            setTitle(task.title);
                            setDescription(task.description);
                            setTaskId(task.id);
                            setEdit(true);
                        }}
                        className="focus:outline-none mx-1 outline-none block rounded-full bg-yellow-600 text-gray-100 shadow-mat active:shadow-inner hover:shadow-inner p-2"
                    >
                        <EditIcon />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="focus:outline-none mx-1 outline-none block rounded-full bg-red-500 text-gray-100 shadow-mat active:shadow-inner hover:shadow-inner p-2"
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};
