import axios from "axios";
import Head from "next/head";
import { TaskCard } from "../components/TaskCard";
import { parseCookies } from "nookies";

export default function Home({ tasks }) {
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
                {tasks.length > 0 ? (
                    tasks.map((task) => <TaskCard key={task.id} task={task} />)
                ) : (
                    <p className="block text-center">
                        Je hebt geen taken voor vandaag!
                        <br />
                        Maak er gebruik van door andere taken af te werken of
                        geniet van je dag.
                    </p>
                )}
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const jwt = parseCookies(context).jwt;

    if (!jwt) {
        context.res.setHeader("location", "/login");
        context.res.statusCode = 302;
        context.res.end();
    }

    const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
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
