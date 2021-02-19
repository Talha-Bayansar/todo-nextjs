import React, { useState } from "react";
import firebaseInit from "../db/firestore";

export const EditTask = ({
    setEdit,
    title,
    setTitle,
    description,
    setDescription,
    taskId,
    setTaskId,
}) => {
    const handleSubmit = async () => {
        console.log("edited");
        if (title !== "" && description !== "") {
            const firebase = await firebaseInit();
            await firebase.firestore().collection("tasks").doc(taskId).update({
                title: title,
                description: description,
                date: new Date(),
            });
            setTitle(null);
            setDescription(null);
            setTaskId(null);
            setEdit(false);
        }
    };
    return (
        <div className="flex items-center justify-center fixed top-0 left-0 h-screen w-screen z-20 shadow-md">
            <div
                onClick={() => setEdit(false)}
                className="w-full h-full bg-black opacity-50"
            />
            <form
                autoComplete="off"
                onSubmit={(e) => e.preventDefault()}
                className="animate-grow absolute shadow-mat flex flex-col bg-gray-200 p-4 rounded-md"
            >
                <div className="flex flex-col m-4">
                    <label htmlFor="title">Titel</label>
                    <input
                        className="focus:outline-none rounded-md p-2 shadow-md"
                        type="text"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div className="flex flex-col m-4">
                    <label htmlFor="description">Beschrijving</label>
                    <textarea
                        className="focus:outline-none rounded-md p-2 shadow-md"
                        type="text"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="focus:outline-none shadow-mat outline-none m-4 bg-white rounded-md py-2 hover:bg-green-300 transition-colors"
                >
                    Taak bewerken
                </button>
            </form>
        </div>
    );
};
