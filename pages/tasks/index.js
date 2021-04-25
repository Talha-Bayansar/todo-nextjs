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
import { useRouter } from "next/router";
import useSWR from "swr";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "react-loader-spinner";

const fetcher = (url) =>
    axios
        .get(url, {
            headers: {
                Authorization: `Bearer ${parseCookies().jwt}`,
            },
        })
        .then((res) => res.data);

const Tasks = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [edit, setEdit] = useState(false);
    const { isDelete } = useTask();

    const jwt = parseCookies().jwt;
    const userId = parseCookies().userId;
    const router = useRouter();
    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    useEffect(() => {
        if (!jwt) {
            router.push("/login");
        }
    }, []);

    const { data, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks?uid_eq=${userId}&_sort=date:ASC,time:ASC`,
        fetcher
    );

    if (error) return "Something went wrong!";
    if (!data)
        return (
            <div className="absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2">
                <Loader
                    type="TailSpin"
                    color="#00BFFF"
                    height={50}
                    width={50}
                    timeout={3000}
                />
            </div>
        );

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className="flex flex-col items-center"
        >
            <Head>
                <title>Taken</title>
            </Head>
            <h1 className="relative text-5xl">Taken</h1>
            <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                    setIsVisible(true);
                }}
                className="focus:outline-none outline-none fixed bottom-28 right-4 text-white rounded-full bg-blue-500 p-2 shadow-mat hover:bg-blue-400 z-10"
            >
                <Add />
            </motion.button>
            <div className="flex flex-wrap justify-center mt-5">
                <AnimatePresence initial={false}>
                    {data.length > 0 ? (
                        data.map((task) => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                setEdit={setEdit}
                            />
                        ))
                    ) : (
                        <p className="block text-center">Je hebt geen taken.</p>
                    )}
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {isVisible && <CreateTask setIsVisible={setIsVisible} />}
                {edit && <EditTask setEdit={setEdit} />}
                {isDelete && <Modal />}
            </AnimatePresence>
        </motion.div>
    );
};

export default Tasks;
