import Head from "next/head";
import { Layout } from "../components/Layout";
import { AuthProvider } from "../contexts/useAuth";
import { TaskProvider } from "../contexts/useTask";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <AuthProvider>
                <TaskProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </TaskProvider>
            </AuthProvider>
        </>
    );
}

export default MyApp;
