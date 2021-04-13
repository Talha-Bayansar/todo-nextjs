import axios from "axios";
import moment from "moment";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { useTask } from "../contexts/useTask";

export const EditTask = ({ setEdit }) => {
    const { taskToEdit, setTaskToEdit, updateTask } = useTask();
    const [title, setTitle] = useState(taskToEdit.title);
    const [description, setDescription] = useState(taskToEdit.description);
    const [date, setDate] = useState(
        moment(taskToEdit.date).locale("nl-be").format("YYYY-MM-DD")
    );
    const [time, setTime] = useState(
        `${moment(date + " " + taskToEdit.time)
            .locale("nl-be")
            .format("LT")}:00.000`
    );
    const [dateTime, setDateTime] = useState(moment(date + " " + time));

    console.log(taskToEdit.date);
    console.log(taskToEdit.time);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jwt = parseCookies().jwt;
        if (title !== "" && description !== "") {
            console.log(
                `EDIT TASK:\ntitle: ${title}\ndescription: ${description}\ndate: ${date}\ntime: ${time}\ndate&time:${dateTime
                    .locale("nl-be")
                    .format("L")} - ${dateTime.locale("nl-be").format("LT")}`
            );
            await axios
                .put(
                    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskToEdit.id}`,
                    {
                        title: title,
                        description: description,
                        date: date,
                        time: time,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${jwt}`,
                        },
                    }
                )
                .then(({ data }) => updateTask(data));
            setTaskToEdit({});
            setEdit(false);
        }
    };
    return (
        <div className="flex items-center justify-center fixed top-0 left-0 h-screen w-screen z-20 shadow-md">
            <div
                onClick={() => {
                    setTaskToEdit({});
                    setEdit(false);
                }}
                className="w-full h-full bg-black opacity-50"
            />
            <form
                autoComplete="off"
                onSubmit={(e) => handleSubmit(e)}
                className="animate-grow absolute shadow-mat flex flex-col bg-gray-200 p-4 rounded-md"
            >
                <div className="flex flex-col my-2">
                    <label htmlFor="title">Titel</label>
                    <input
                        className="focus:outline-none rounded-md p-2 shadow-md"
                        type="text"
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </div>
                <div className="flex flex-col my-2">
                    <label htmlFor="description">Beschrijving</label>
                    <textarea
                        className="focus:outline-none h-24 rounded-md p-2 shadow-md"
                        type="text"
                        name="description"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    />
                </div>
                <div className="flex justify-between my-2">
                    <div className="flex flex-col mr-1">
                        <label htmlFor="date">Datum</label>
                        <input
                            className="focus:outline-none rounded-md p-2 shadow-md w-min"
                            type="date"
                            name="date"
                            onChange={(e) => {
                                setDate(e.target.value);
                                setDateTime(
                                    moment(e.target.value + " " + time)
                                );
                            }}
                            value={date}
                        />
                    </div>
                    <div className="flex flex-col ml-1">
                        <label htmlFor="time">Tijdstip</label>
                        <input
                            className="focus:outline-none rounded-md p-2 shadow-md w-min"
                            type="time"
                            name="time"
                            onChange={(e) => {
                                setTime(`${e.target.value}:00.000`);
                                setDateTime(
                                    moment(date + " " + e.target.value)
                                );
                            }}
                            value={time}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="focus:outline-none shadow-mat outline-none my-2 bg-white rounded-md py-2 hover:bg-green-300 transition-colors"
                >
                    Taak aanmaken
                </button>
            </form>
        </div>
    );
};
