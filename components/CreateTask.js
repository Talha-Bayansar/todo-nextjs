import React, { useState } from "react";
import firebaseInit from "../db/firestore";

export const CreateTask = ({ setIsVisible }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const handleSubmit = async () => {
        console.log("created");
        if (title !== "" && description !== "") {
            const firebase = await firebaseInit();
            await firebase.firestore().collection("tasks").add({
                title: title,
                description: description,
                date: new Date(),
            });
            setTitle("");
            setDescription("");
            setIsVisible(false);
        }
    };
    return (
        <div className="flex items-center justify-center fixed top-0 left-0 h-screen w-screen z-20 shadow-md">
            <div
                onClick={() => setIsVisible(false)}
                className="w-full h-full bg-black opacity-50"
            />
            <form
                onSubmit={(e) => e.preventDefault()}
                className="absolute flex flex-col bg-gray-200 p-4 rounded-md"
            >
                <div className="flex flex-col m-4">
                    <label htmlFor="title">Titel</label>
                    <input
                        className="rounded-md p-2"
                        type="text"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div className="flex flex-col m-4">
                    <label htmlFor="description">Beschrijving</label>
                    <textarea
                        className="rounded-md p-2"
                        type="text"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className="focus:outline-none outline-none m-4 bg-white rounded-md py-2 hover:bg-green-300 transition-colors"
                >
                    Taak aanmaken
                </button>
            </form>
        </div>
    );
};
