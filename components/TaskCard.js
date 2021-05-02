import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ReactReadMoreReadLess from "react-read-more-read-less";
import moment from "moment";
import { useTask } from "../contexts/useTask";
import { motion } from "framer-motion";

export const TaskCard = ({ task, setEdit }) => {
    const { setTaskToEdit, setIsDelete, setTaskToDelete } = useTask();
    const [checked] = useState(task.isChecked);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className={`flex rounded-xl bg-gray-100 my-4 md:m-6 sm:max-w-sm max-w-50 p-4 shadow-mat ${
                checked && "bg-gray-300"
            }`}
        >
            <div className="flex flex-col justify-between flex-grow overflow-x-hidden">
                <h1 className={`text-2xl ${checked && "line-through"}`}>
                    {task.title}
                </h1>
                <p
                    className={`${
                        checked && "line-through"
                    } whitespace-pre-line my-3`}
                >
                    <ReactReadMoreReadLess
                        charLimit={120}
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
            </div>
        </motion.div>
    );
};
