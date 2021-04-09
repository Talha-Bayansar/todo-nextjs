import axios from "axios";
import Head from "next/head";
import { TaskCard } from "../components/TaskCard";

export default function Home({ tasks }) {
    console.log(tasks);
    return (
        <div className="flex flex-col items-center">
            <Head>
                <title>Home</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="text-4xl border-t-2 border-b-2 w-min py-2 p-6">
                Vandaag
            </h1>
            <div className="flex flex-wrap justify-center mt-5">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`
    );

    return {
        props: {
            tasks: data,
        },
    };
}

// const now = new Date();
//     const today = now.getDate().toString().padStart(2, "0");
//     const tomorrow = (now.getDate() + 1).toString().padStart(2, "0");
//     const month = (now.getMonth() + 1).toString().padStart(2, "0");
//     const year = now.getFullYear().toString().padStart(2, "0");
//     const date1 = `${year}-${month}-${today}`;
//     const date2 = `${year}-${month}-${tomorrow}`;
//     const date11 = new Date(date1 + " " + "00:00");
//     const date22 = new Date(date2 + " " + "00:00");
