import axios from "axios";
import { parseCookies } from "nookies";
import React from "react";
import { useTask } from "../contexts/useTask";

const Modal = () => {
    const { setIsDelete, setTaskToDelete, taskToDelete } = useTask();

    const handleDelete = async () => {
        console.log("DELETE TASK");
        const jwt = parseCookies().jwt;
        await axios
            .delete(
                `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskToDelete.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            )
            .then((res) => console.log("SUCCES", res))
            .catch((err) => console.log(err, jwt));
        setIsDelete(false);
        setTaskToDelete({});
    };

    return (
        <div className="flex items-center justify-center fixed top-0 left-0 h-screen w-screen z-20 shadow-md">
            <div
                onClick={() => setIsDelete(false)}
                className="w-full h-full bg-black opacity-50"
            />
            <div className="animate-grow absolute shadow-mat flex flex-col bg-gray-200 p-4 rounded-md">
                <div className="block mb-2">
                    Ben je zeker dat je deze taak wilt verwijderen?
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => setIsDelete(false)}
                        className="focus:outline-none block font-bold text-white bg-blue-500 rounded-sm p-1 m-1 hover:bg-blue-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="focus:outline-none block font-bold text-white bg-red-500 rounded-sm p-1 m-1 hover:bg-red-400"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
