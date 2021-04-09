import Head from "next/head";
import { Layout } from "../components/Layout";
import { AuthProvider } from "../contexts/useAuth";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <AuthProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </>
    );
}

export default MyApp;
