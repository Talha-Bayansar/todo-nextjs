import Head from "next/head";
import React, { useEffect, useState } from "react";
import { CreateTask } from "../../components/CreateTask";
import { TaskCard } from "../../components/TaskCard";
import firebaseInit from "../../db/firestore";

const Tasks = ({ tasks }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [allTasks, setAllTasks] = useState([]);
    useEffect(async () => {
        const firebase = await firebaseInit();
        firebase
            .firestore()
            .collection("tasks")
            .onSnapshot((snap) => {
                const tasks = snap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setAllTasks(tasks);
            });
    }, []);
    return (
        <div className="flex flex-col items-center">
            <Head>
                <title>Taken</title>
            </Head>
            <h1 className="relative text-5xl">Tasks</h1>
            <button
                onClick={() => {
                    setIsVisible(true);
                }}
                className="focus:outline-none outline-none fixed top-28 right-4 bg-white text-blue-500 border-2
             border-gray-300 rounded-md px-2 py-1 hover:border-blue-500"
            >
                + Add
            </button>
            <div className="flex flex-wrap justify-center mt-20">
                {allTasks.length === 0
                    ? tasks.map((task) => (
                          <TaskCard key={task.id} task={task} />
                      ))
                    : allTasks.map((task) => (
                          <TaskCard key={task.id} task={task} />
                      ))}
            </div>
            {isVisible && <CreateTask setIsVisible={setIsVisible} />}
        </div>
    );
};

Tasks.getInitialProps = async () => {
    const firebase = await firebaseInit();
    const tasks = await firebase
        .firestore()
        .collection("tasks")
        .get()
        .then((qs) => {
            console.log(qs);
            let data = [];
            qs.forEach((doc) =>
                data.push({
                    id: doc.id,
                    ...doc.data(),
                })
            );
            return data;
        });

    return {
        tasks: tasks,
    };
};

export default Tasks;
