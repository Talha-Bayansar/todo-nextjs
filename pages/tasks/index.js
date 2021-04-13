import Head from "next/head";
import React, { useEffect, useState } from "react";
import { CreateTask } from "../../components/CreateTask";
import { TaskCard } from "../../components/TaskCard";
import { Add } from "@material-ui/icons";
import { EditTask } from "../../components/EditTask";
import axios from "axios";
import { parseCookies } from "nookies";
import { useTask } from "../../contexts/useTask";
import Modal from "../../components/Modal";

const Tasks = ({ tasks }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [edit, setEdit] = useState(false);
    const { isDelete, allTasks, setAllTasks } = useTask();
    useEffect(() => {
        setAllTasks(tasks);
    }, []);

    return (
        <div className="flex flex-col items-center">
            <Head>
                <title>Taken</title>
            </Head>
            <h1 className="relative text-5xl">Taken</h1>
            <button
                onClick={() => {
                    setIsVisible(true);
                }}
                className="focus:outline-none outline-none fixed bottom-28 right-4 text-white rounded-full bg-blue-500 p-2 shadow-mat hover:bg-blue-400 active:bg-blue-400 z-10"
            >
                <Add />
            </button>
            <div className="flex flex-wrap justify-center mt-5">
                {allTasks.length > 0 ? (
                    allTasks.map((task) => (
                        <TaskCard key={task.id} task={task} setEdit={setEdit} />
                    ))
                ) : (
                    <p className="block text-center">Je hebt geen taken.</p>
                )}
            </div>
            {isVisible && <CreateTask setIsVisible={setIsVisible} />}
            {edit && <EditTask setEdit={setEdit} />}
            {isDelete && <Modal />}
        </div>
    );
};

export async function getServerSideProps(context) {
    const jwt = parseCookies(context).jwt;
    const userId = parseCookies(context).userId;

    if (!jwt) {
        context.res.setHeader("location", "/login");
        context.res.statusCode = 302;
        context.res.end();
    }

    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks?uid_eq=${userId}&_sort=date:ASC,time:ASC`,
        {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }
    );

    return {
        props: {
            tasks: data,
        },
    };
}

export default Tasks;
