import React, { useEffect, useState } from "react";
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

export const TaskCard = ({ task, setEdit }) => {
    const { setTaskToEdit, setIsDelete, setTaskToDelete } = useTask();
    const [checked, setChecked] = useState(task.isChecked);

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
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0, scale: 0.3 }}
            className={`flex rounded-xl bg-gray-100 my-4 md:m-6 max-w-sm p-4 shadow-mat ${
                checked && "opacity-50"
            }`}
        >
            <div className="flex flex-col justify-between flex-grow">
                <h1 className={`text-2xl ${checked && "line-through"}`}>
                    {task.title}
                </h1>
                <p
                    className={`${
                        checked && "line-through"
                    } whitespace-pre-line my-3`}
                >
                    <ReactReadMoreReadLess
                        charLimit={150}
                        readMoreText={"Read more"}
                        readLessText={"Read less"}
                        readMoreClassName="text-blue-800"
                        readLessClassName="text-blue-800"
                    >
                        {task.description}
                    </ReactReadMoreReadLess>
                </p>
                <span className="block text-gray-500">
                    {moment(task.date)
                        .locale("nl-be")
                        .format("dddd DD/MM/YYYY") +
                        ", " +
                        moment(task.date + " " + task.time)
                            .locale("nl-be")
                            .format("LT")}
                </span>
            </div>

            <div className="flex flex-col w-min ml-4 justify-start">
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        setChecked(!checked);
                        checkTodo(!checked);
                    }}
                    className="focus:outline-none my-1 outline-none block rounded-full bg-blue-500 text-gray-100 shadow-mat active:shadow-inner hover:shadow-inner p-2"
                >
                    <CheckIcon />
                </motion.button>
                {setEdit && (
                    <>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                setTaskToEdit(task);
                                setEdit(true);
                            }}
                            className="focus:outline-none my-1 outline-none block rounded-full bg-yellow-600 text-gray-100 shadow-mat active:shadow-inner hover:shadow-inner p-2"
                        >
                            <EditIcon />
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                                setTaskToDelete(task);
                                setIsDelete(true);
                                console.log("isDelete true");
                            }}
                            className="focus:outline-none my-1 outline-none block rounded-full bg-red-500 text-gray-100 shadow-mat active:shadow-inner hover:shadow-inner p-2"
                        >
                            <DeleteIcon />
                        </motion.button>
                    </>
                )}
            </div>
        </motion.div>
    );
};
