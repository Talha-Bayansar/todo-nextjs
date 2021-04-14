import axios from "axios";
import Head from "next/head";
import { TaskCard } from "../components/TaskCard";
import { parseCookies } from "nookies";
import moment from "moment";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";

const fetcher = (url) =>
    axios
        .get(url, {
            headers: {
                Authorization: `Bearer ${parseCookies().jwt}`,
            },
        })
        .then((res) => res.data);

export default function Home() {
    const jwt = parseCookies().jwt;
    const userId = parseCookies().userId;
    const now = moment();
    const router = useRouter();

    useEffect(() => {
        if (!jwt) {
            router.push("/login");
        }
    }, []);

    const { data, error } = useSWR(
        `${
            process.env.NEXT_PUBLIC_API_URL
        }/tasks?uid_eq=${userId}&date_eq=${now.format(
            "YYYY-MM-DD"
        )}&_sort=time:ASC`,
        fetcher
    );

    if (error) return "Something went wrong!";
    if (!data) return "Loading...";

    return (
        <div className="flex flex-col items-center">
            <Head>
                <title>StartPagina</title>
            </Head>
            <h1 className="text-4xl border-t-2 border-b-2 w-min py-2 p-6">
                Vandaag
            </h1>
            <div className="flex flex-wrap justify-center mt-5">
                {data.length > 0 ? (
                    data.map((task) => <TaskCard key={task.id} task={task} />)
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

// export async function getStaticProps() {
//     const jwt = parseCookies().jwt;
//     const userId = parseCookies().userId;
//     const now = moment();

//     if (!jwt) {
//         return {
//             props: {
//                 tasks: [],
//             },
//         };
//     }

//     const { data } = await axios.get(
//         `${
//             process.env.NEXT_PUBLIC_API_URL
//         }/tasks?uid_eq=${userId}&date_eq=${now.format(
//             "YYYY-MM-DD"
//         )}&_sort=time:ASC`,
//         {
//             headers: {
//                 Authorization: `Bearer ${jwt}`,
//             },
//         }
//     );

//     return {
//         props: {
//             tasks: data,
//         },
//     };
// }
