import React, { useState } from "react";
import { useAuth } from "../contexts/useAuth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, errorMessage } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        signIn(email, password);
    };
    return (
        <div className="flex flex-col items-center justify-center w-full mt-20">
            <h1 className="text-5xl mb-10">Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-min">
                <div className="flex flex-col my-2">
                    <label htmlFor="email">Email</label>
                    <input
                        className="bg-gray-200 rounded-md px-2 py-2 focus:outline-none shadow-mat"
                        type="text"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="flex flex-col my-2">
                    <label htmlFor="password">Password</label>
                    <input
                        className="bg-gray-200 rounded-md px-2 py-2 focus:outline-none shadow-mat"
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-gray-400 mt-4 rounded-md py-2 text-white font-bold shadow-mat focus:outline-none active:shadow-none hover:shadow-none"
                >
                    Login
                </button>
                {errorMessage && (
                    <p className="block text-red-600">{errorMessage}</p>
                )}
            </form>
        </div>
    );
};

export default Login;
