import React, { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
    };
    return (
        <div className="flex items-center justify-center w-full mt-20">
            <form onSubmit={handleSubmit} className="flex flex-col w-min">
                <div className="flex flex-col my-2">
                    <label htmlFor="email">Email</label>
                    <input
                        className="bg-gray-200 rounded-md px-2 py-2 focus:outline-none"
                        type="text"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div className="flex flex-col my-2">
                    <label htmlFor="password">Password</label>
                    <input
                        className="bg-gray-200 rounded-md px-2 py-2 focus:outline-none"
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-gray-300 mt-4 rounded-md py-2"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
