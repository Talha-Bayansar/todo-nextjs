import React from "react";
import Link from "next/link";

export const Layout = ({ children }) => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const date = `${day}-${month}-${year}`;
    return (
        <div className="flex flex-col items-center w-full">
            <nav className="flex bg-gray-200 justify-between items-center fixed top-0 w-full h-16 px-8 z-10 shadow-lg">
                <h1 className="text-3xl font-bold hidden sm:block">Logo</h1>
                <div className="flex justify-evenly h-full w-full sm:w-auto">
                    <Link href="/">
                        <a className="flex items-center hover:bg-gray-300 active:bg-gray-300 px-4 rounded-lg">
                            Startpagina
                        </a>
                    </Link>
                    <Link href="/tasks">
                        <a className="flex items-center hover:bg-gray-300 active:bg-gray-300 px-4 rounded-lg">
                            Taken
                        </a>
                    </Link>
                    <span className="flex items-center px-4 text-green-700">
                        {date}
                    </span>
                </div>
            </nav>
            <div className="mt-16 w-full p-8">{children}</div>
        </div>
    );
};
