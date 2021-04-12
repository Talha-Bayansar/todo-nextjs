import axios from "axios";
import moment from "moment";
import { parseCookies } from "nookies";
import React, { useState } from "react";

export const CreateTask = ({ setIsVisible }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(
        moment().locale("nl-be").format("YYYY-MM-DD")
    );
    const [time, setTime] = useState(moment().locale("nl-be").format("LT"));
    const [dateTime, setDateTime] = useState(moment(date + " " + time));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jwt = parseCookies().jwt;
        if (title !== "" && description !== "") {
            console.log(
                `CREATE TASK:\ntitle: ${title}\ndescription: ${description}\ndate: ${date}\ntime: ${time}\ndate&time:${dateTime
                    .locale("nl-be")
                    .format("L")} - ${dateTime.locale("nl-be").format("LT")}`
            );
            await axios
                .post(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
                    data: {
                        title: title,
                        description: description,
                    },
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                })
                .then((res) => console.log("SUCCES", res))
                .catch((error) => console.log(error, jwt));
            setTitle("");
            setDescription("");
            setDate("");
            setTime("");
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
                                setTime(e.target.value);
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
