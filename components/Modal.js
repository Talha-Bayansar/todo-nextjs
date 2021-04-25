import axios from "axios";
import { motion } from "framer-motion";
import { parseCookies } from "nookies";
import React from "react";
import { mutate } from "swr";
import { useAuth } from "../contexts/useAuth";
import { useTask } from "../contexts/useTask";

const Modal = () => {
    const { setIsDelete, setTaskToDelete, taskToDelete } = useTask();

    const { user } = useAuth();

    const handleDelete = async () => {
        const jwt = parseCookies().jwt;
        const userId = parseCookies().userId;

        if (taskToDelete.uid === user.id) {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskToDelete.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            mutate(
                `${process.env.NEXT_PUBLIC_API_URL}/tasks?uid_eq=${userId}&_sort=date:ASC,time:ASC`
            );
        }

        setIsDelete(false);
        setTaskToDelete({});
    };

    return (
        <div className="flex items-center justify-center fixed top-0 left-0 h-screen w-screen z-20 shadow-md">
            <div
                onClick={() => setIsDelete(false)}
                className="w-full h-full bg-black opacity-50"
            />
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute shadow-mat flex flex-col bg-gray-200 p-4 rounded-md max-w-50"
            >
                <div className="block mb-2">
                    Ben je zeker dat je deze taak wilt verwijderen?
                </div>
                <div className="flex justify-end">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsDelete(false)}
                        className="focus:outline-none block font-bold text-white bg-blue-500 rounded-sm p-1 m-1 hover:bg-blue-400"
                    >
                        Cancel
                    </motion.button>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleDelete}
                        className="focus:outline-none block font-bold text-white bg-red-500 rounded-sm p-1 m-1 hover:bg-red-400"
                    >
                        Delete
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default Modal;
