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
                    <Head>
                        {/* <!-- Must --> */}
                        <meta charSet="utf-8" />
                        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                        <meta
                            name="viewport"
                            content="width=device-width, initial-scale=1, user-scalable=no"
                        />
                        <meta name="description" content="Description" />
                        <meta name="keywords" content="Keywords" />
                        <title>Page Title</title>

                        {/* <!-- Android  --> */}
                        <meta name="theme-color" content="white" />
                        <meta name="mobile-web-app-capable" content="yes" />

                        {/* <!-- iOS --> */}
                        <meta
                            name="apple-mobile-web-app-title"
                            content="Application Title"
                        />
                        <meta
                            name="apple-mobile-web-app-capable"
                            content="yes"
                        />
                        <meta
                            name="apple-mobile-web-app-status-bar-style"
                            content="default"
                        />

                        {/* <!-- Windows  --> */}
                        <meta
                            name="msapplication-navbutton-color"
                            content="#e5e7eb"
                        />
                        <meta name="msapplication-TileColor" content="white" />
                        <meta
                            name="msapplication-config"
                            content="browserconfig.xml"
                        />

                        {/* <!-- Pinned Sites  --> */}
                        <meta
                            name="application-name"
                            content="Application Name"
                        />
                        <meta
                            name="msapplication-tooltip"
                            content="Tooltip Text"
                        />
                        <meta name="msapplication-starturl" content="/" />

                        {/* <!-- Tap highlighting  --> */}
                        <meta name="msapplication-tap-highlight" content="no" />

                        {/* <!-- UC Mobile Browser  --> */}
                        <meta name="full-screen" content="yes" />
                        <meta name="browsermode" content="application" />

                        {/* <!-- Disable night mode for this page  --> */}
                        <meta name="nightmode" content="enable/disable" />

                        {/* <!-- Layout mode --> */}
                        <meta name="layoutmode" content="fitscreen/standard" />

                        {/* <!-- imagemode - show image even in text only mode  --> */}
                        <meta name="imagemode" content="force" />

                        {/* <!-- Orientation  --> */}
                        <meta name="screen-orientation" content="portrait" />
                        <link
                            rel="apple-touch-icon"
                            href="/public/icons/apple-icon-180.png"
                        />

                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-2048-2732.jpg"
                            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-2732-2048.jpg"
                            media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-1668-2388.jpg"
                            media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-2388-1668.jpg"
                            media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-1536-2048.jpg"
                            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-2048-1536.jpg"
                            media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-1668-2224.jpg"
                            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-2224-1668.jpg"
                            media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-1620-2160.jpg"
                            media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-2160-1620.jpg"
                            media="(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-1284-2778.jpg"
                            media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-2778-1284.jpg"
                            media="(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-1170-2532.jpg"
                            media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-2532-1170.jpg"
                            media="(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-1125-2436.jpg"
                            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-2436-1125.jpg"
                            media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-1242-2688.jpg"
                            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-2688-1242.jpg"
                            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-828-1792.jpg"
                            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-1792-828.jpg"
                            media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-1242-2208.jpg"
                            media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-2208-1242.jpg"
                            media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-750-1334.jpg"
                            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-1334-750.jpg"
                            media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-640-1136.jpg"
                            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
                        />
                        <link
                            rel="apple-touch-startup-image"
                            href="/public/icons/apple-splash-1136-640.jpg"
                            media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
                        />

                        {/* <!-- Manifest.json  --> */}
                        <link href="/manifest.json" rel="manifest" />
                    </Head>

                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </TaskProvider>
            </AuthProvider>
        </>
    );
}

export default MyApp;
