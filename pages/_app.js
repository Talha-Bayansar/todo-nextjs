import Head from "next/head";
import { Layout } from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="manifest" href="/manifest.json" />
                <meta
                    name="viewport"
                    content="initial-scale=1, viewport-fit=cover, user-scalable=no"
                />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}

export default MyApp;
