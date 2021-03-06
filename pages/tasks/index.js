import Head from "next/head";
import React, { useEffect, useState } from "react";
import { CreateTask } from "../../components/CreateTask";
import { TaskCard } from "../../components/TaskCard";
import firebaseInit from "../../db/firestore";
import { Add } from "@material-ui/icons";
import { EditTask } from "../../components/EditTask";

const Tasks = ({ tasks }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [taskId, setTaskId] = useState(null);
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [allTasks, setAllTasks] = useState();
    useEffect(async () => {
        const firebase = await firebaseInit();
        firebase
            .firestore()
            .collection("tasks")
            .orderBy("date")
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
                {allTasks === undefined
                    ? tasks.map((task) => (
                          <TaskCard
                              key={task.id}
                              task={task}
                              setEdit={setEdit}
                              setTitle={setTitle}
                              setDescription={setDescription}
                              setTaskId={setTaskId}
                              setDate={setDate}
                              setTime={setTime}
                          />
                      ))
                    : allTasks.map((task) => (
                          <TaskCard
                              key={task.id}
                              task={task}
                              setEdit={setEdit}
                              setTitle={setTitle}
                              setDescription={setDescription}
                              setTaskId={setTaskId}
                              setDate={setDate}
                              setTime={setTime}
                          />
                      ))}
            </div>
            {isVisible && <CreateTask setIsVisible={setIsVisible} />}
            {edit && (
                <EditTask
                    setEdit={setEdit}
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    taskId={taskId}
                    setTaskId={setTaskId}
                    date={date}
                    setDate={setDate}
                    time={time}
                    setTime={setTime}
                />
            )}
        </div>
    );
};

Tasks.getInitialProps = async () => {
    const firebase = await firebaseInit();
    const tasks = await firebase
        .firestore()
        .collection("tasks")
        .orderBy("date")
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
