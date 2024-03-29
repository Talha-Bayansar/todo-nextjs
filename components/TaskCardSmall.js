import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import ReactReadMoreReadLess from "react-read-more-read-less";
import moment from "moment";
import { useTask } from "../contexts/useTask";
import axios from "axios";
import { parseCookies } from "nookies";
import { mutate } from "swr";
import { motion } from "framer-motion";

const TaskCardSmall = ({ task }) => {
    const [checked, setChecked] = useState(task.isChecked);
    const { setIsSelectedTask, setSelectedTask } = useTask();

    const checkTodo = async (value) => {
        const jwt = parseCookies().jwt;
        const userId = parseCookies().userId;

        await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`,
            {
                isChecked: value,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );
        mutate(
            `${process.env.NEXT_PUBLIC_API_URL}/tasks?uid_eq=${userId}&_sort=date:ASC,time:ASC`
        );
    };

    return (
        <motion.div
            whileTap={{ scale: 0.8 }}
            className={`flex flex-col rounded-xl bg-gray-100 my-4 mx-2 md:m-6 max-w-card p-4 shadow-mat ${
                checked && "bg-gray-300"
            }`}
        >
            <div className="flex justify-between flex-grow">
                <h1
                    className={`text-base select-none overflow-hidden text-gray-700 font-semibold ${
                        checked && "line-through"
                    }`}
                    onClick={() => {
                        setSelectedTask(task);
                        setIsSelectedTask(true);
                    }}
                >
                    {task.title}
                </h1>

                <div className="block w-min ml-2">
                    <button
                        onClick={() => {
                            setChecked(!checked);
                            checkTodo(!checked);
                        }}
                        className="focus:outline-none outline-none block rounded-full bg-blue-500 text-gray-100 shadow-mat active:shadow-inner hover:shadow-inner p-1"
                    >
                        <CheckIcon />
                    </button>
                </div>
            </div>

            <span
                className="block text-gray-500 text-xs mt-2 select-none"
                onClick={() => {
                    setSelectedTask(task);
                    setIsSelectedTask(true);
                }}
            >
                {moment(task.date + " " + task.time)
                    .locale("nl-be")
                    .format("LT")}
            </span>
        </motion.div>
    );
};

export default TaskCardSmall;
