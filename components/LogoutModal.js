import axios from "axios";
import { parseCookies } from "nookies";
import React from "react";
import { useAuth } from "../contexts/useAuth";

const LogoutModal = () => {
    const { setIsLogout, signOut } = useAuth();

    const handleLogout = () => {
        signOut();
        setIsLogout(false);
    };

    return (
        <div className="flex items-center justify-center fixed top-0 left-0 h-screen w-screen z-20 shadow-md">
            <div
                onClick={() => setIsLogout(false)}
                className="w-full h-full bg-black opacity-50"
            />
            <div className="animate-grow absolute shadow-mat flex flex-col bg-gray-200 p-4 rounded-md">
                <div className="block mb-2">
                    Ben je zeker dat je wilt uitloggen?
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => setIsLogout(false)}
                        className="focus:outline-none block font-bold text-white bg-red-500 rounded-sm p-1 m-1 hover:bg-red-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleLogout}
                        className="focus:outline-none block font-bold text-white bg-blue-500 rounded-sm p-1 m-1 hover:bg-blue-400"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;
