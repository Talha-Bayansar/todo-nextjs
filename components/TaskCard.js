import React from "react";
import firebaseInit from "../db/firestore";

export const TaskCard = ({ task }) => {
    const date = new Date(task.date.seconds * 1000).toString().slice(0, 16);
    const handleDelete = async (id) => {
        const firebase = await firebaseInit();
        await firebase.firestore().collection("tasks").doc(id).delete();
    };
    return (
        <div className="border-2 rounded border-green-600 m-6 max-w-sm p-4">
            <h1 className="text-2xl">{task.title}</h1>
            <p className="mt-6">{task.description}</p>
            <div className="flex w-full items-center mt-6 justify-between">
                <span className="block text-gray-500 mr-8">{date}</span>
                <button
                    onClick={() => handleDelete(task.id)}
                    className="focus:outline-none outline-none block rounded-lg shadow-md active:bg-gray-200 hover:bg-gray-200 px-4 py-2 bg-gray-300"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};
