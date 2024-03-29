import axios from "axios";
import Head from "next/head";
import { TaskCard } from "../components/TaskCard";
import { parseCookies } from "nookies";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "react-loader-spinner";
import TaskCardSmall from "../components/TaskCardSmall";
import { useTask } from "../contexts/useTask";
import TaskCardDetails from "../components/TaskCardDetails";

export default function Home() {
    const jwt = parseCookies().jwt;
    const userId = parseCookies().userId;
    const now = moment();
    const router = useRouter();
    const [data, setData] = useState();
    const [error, setError] = useState();
    const { isSelectedTask } = useTask();

    const variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    useEffect(() => {
        if (!jwt) {
            router.push("/login");
        }

        axios
            .get(
                `${
                    process.env.NEXT_PUBLIC_API_URL
                }/tasks?uid_eq=${userId}&date_eq=${now.format(
                    "YYYY-MM-DD"
                )}&_sort=time:ASC`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            )
            .then((res) => setData(res.data))
            .catch((err) => setError(err));
    }, []);

    if (error) return "Something went wrong!";
    if (!data)
        return (
            <div className="absolute top-1/2 left-1/2 -ml-6 -mt-6">
                <Loader
                    type="TailSpin"
                    color="#00BFFF"
                    height={48}
                    width={48}
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
                <title>Start</title>
            </Head>
            <h1 className="text-4xl border-t-2 border-b-2 w-min py-2 p-6">
                Vandaag
            </h1>
            <div className="flex flex-wrap justify-center mt-5">
                <AnimatePresence initial={false}>
                    {data.length > 0 ? (
                        data.map((task) => (
                            <TaskCardSmall key={task.id} task={task} />
                        ))
                    ) : (
                        <p className="block text-center">
                            Je hebt geen taken voor vandaag!
                            <br />
                            <br />
                            Maak er gebruik van door andere taken af te werken
                            of geniet van je dag.
                        </p>
                    )}
                    {isSelectedTask && <TaskCardDetails />}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
