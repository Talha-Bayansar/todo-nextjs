import Head from "next/head";
import { TaskCard } from "../components/TaskCard";
import firebaseInit from "../db/firestore";
import { useRequireAuth } from "../hooks/useRequireAuth";

export default function Home({ tasks }) {
    const auth = useRequireAuth();
    if (!auth.user) return null;
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

Home.getInitialProps = async () => {
    const now = new Date();
    const today = now.getDate().toString().padStart(2, "0");
    const tomorrow = (now.getDate() + 1).toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear().toString().padStart(2, "0");
    const date1 = `${year}-${month}-${today}`;
    const date2 = `${year}-${month}-${tomorrow}`;
    const date11 = new Date(date1 + " " + "00:00");
    const date22 = new Date(date2 + " " + "00:00");

    const firebase = await firebaseInit();
    const tasks = await firebase
        .firestore()
        .collection("tasks")
        .where("date", ">=", date11)
        .where("date", "<", date22)
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
