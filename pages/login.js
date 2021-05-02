import { motion } from "framer-motion";
import Head from "next/head";
import React, { useState } from "react";
import Loader from "react-loader-spinner";
import { useAuth } from "../contexts/useAuth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, errorMessage, isLoading } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        signIn(email, password);
    };
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Head>
                <title>Aanmelden</title>
            </Head>
            <div className="flex flex-col items-center justify-center w-full mt-20">
                <h1 className="text-5xl mb-10">Welkom gebruiker!</h1>
                <form onSubmit={handleSubmit} className="flex flex-col w-min">
                    <div className="flex flex-col my-2">
                        <label htmlFor="email">E-mailadres</label>
                        <input
                            className="bg-gray-200 rounded-md px-2 py-2 focus:outline-none shadow-mat"
                            type="text"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="password">Wachtwoord</label>
                        <input
                            className="bg-gray-200 rounded-md px-2 py-2 focus:outline-none shadow-mat"
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>
                    <motion.button
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        whileTap={{ scale: 0.9 }}
                        type="submit"
                        className="bg-gray-400 mt-4 rounded-md py-2 text-white font-bold shadow-mat focus:outline-none active:shadow-none hover:shadow-none"
                    >
                        Aanmelden
                    </motion.button>
                    {errorMessage && (
                        <p className="block text-red-600">{errorMessage}</p>
                    )}
                    {isLoading && (
                        <div className="flex justify-center mt-4">
                            <Loader
                                type="TailSpin"
                                color="#00BFFF"
                                height={24}
                                width={24}
                            />
                        </div>
                    )}
                </form>
            </div>
        </motion.div>
    );
};

export default Login;
