import React, { useEffect, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from "@material-ui/icons/Edit";
import ReactReadMoreReadLess from "react-read-more-read-less";
import moment from "moment";

export const TaskCard = ({
    task,
    setEdit,
    setTitle,
    setDescription,
    setTaskId,
    setDate,
    setTime,
}) => {
    const [checked, setChecked] = useState(task.checked);
    const date = moment(task.date).locale("nl-be").format("YYYY-MM-DD");
    const time = moment(task.date).locale("nl-be").format("LT");

    const handleDelete = async () => {
        console.log("DELETE TASK");
    };

    const checkTodo = async () => {
        console.log("CHECK TASK");
    };

    useEffect(() => {
        checkTodo();
    }, [checked]);
    return (
        <div
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
                        .format("dddd DD/MM/YYYY, LT")}
                </span>
            </div>

            <div className="flex flex-col w-min ml-4 justify-start">
                <button
                    onClick={() => setChecked(!checked)}
                    className="focus:outline-none my-1 outline-none block rounded-full bg-blue-500 text-gray-100 shadow-mat active:shadow-inner hover:shadow-inner p-2"
                >
                    <CheckIcon />
                </button>
                {setEdit && (
                    <>
                        <button
                            onClick={() => {
                                console.log(`${date}---${time}`);
                                setTitle(task.title);
                                setDescription(task.description);
                                setTaskId(task.id);
                                setEdit(true);
                                setDate(date);
                                setTime(time);
                            }}
                            className="focus:outline-none my-1 outline-none block rounded-full bg-yellow-600 text-gray-100 shadow-mat active:shadow-inner hover:shadow-inner p-2"
                        >
                            <EditIcon />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="focus:outline-none my-1 outline-none block rounded-full bg-red-500 text-gray-100 shadow-mat active:shadow-inner hover:shadow-inner p-2"
                        >
                            <DeleteIcon />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
