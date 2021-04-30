import axios from "axios";
import moment from "moment";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { useAuth } from "../contexts/useAuth";
import { mutate } from "swr";
import { motion } from "framer-motion";

export const CreateTask = ({ setIsVisible }) => {
    const { user } = useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(
        moment().locale("nl-be").format("YYYY-MM-DD")
    );
    const [time, setTime] = useState(
        `${moment().locale("nl-be").format("LT")}:00.000`
    );

    const formVar = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
        },
        removed: {
            opacity: 0,
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jwt = parseCookies().jwt;
        const userId = parseCookies().userId;

        if (title !== "" && description !== "") {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
                {
                    title: title,
                    description: description,
                    date: date,
                    time: time,
                    isChecked: false,
                    uid: user.id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            mutate(
                `${process.env.NEXT_PUBLIC_API_URL}/tasks?uid_eq=${userId}&_sort=date:ASC,time:ASC`
            );
            setTitle("");
            setDescription("");
            setDate("");
            setTime("");
            setIsVisible(false);
        }
    };
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="removed"
            variants={formVar}
            className="flex items-center justify-center fixed top-0 left-0 h-screen w-screen z-20 shadow-md"
        >
            <div
                onClick={() => setIsVisible(false)}
                className="w-full h-full bg-black opacity-50"
            />
            <form
                autoComplete="off"
                onSubmit={(e) => handleSubmit(e)}
                className="absolute shadow-mat flex flex-col bg-gray-200 p-4 rounded-md"
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
                            }}
                            value={time}
                        />
                    </div>
                </div>

                <motion.button
                    whileTap={{ scale: 0.9 }}
                    type="submit"
                    className="focus:outline-none shadow-mat outline-none my-2 bg-white rounded-md py-2 hover:bg-green-300 transition-colors"
                >
                    Taak aanmaken
                </motion.button>
            </form>
        </motion.div>
    );
};
