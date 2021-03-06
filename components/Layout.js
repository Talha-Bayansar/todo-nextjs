import React, { useEffect, useState } from "react";
import Link from "next/link";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Image from "next/image";

export const Layout = ({ children }) => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const date = `${day
        .toString()
        .padStart(2, "0")}-${month
        .toString()
        .padStart(2, "0")}-${year.toString().padStart(2, "0")}`;
    return (
        <div className="flex flex-col items-center w-full h-screen sm:h-auto">
            <nav className="flex bg-white justify-between items-center sm:fixed top-0 w-full h-16 py-4 px-8 z-10 shadow-lg">
                <Image
                    src="/icon.png"
                    alt="Planner Logo"
                    width={50}
                    height={50}
                />
                <div className="hidden sm:flex sm:justify-evenly sm:flex-grow sm:w-auto">
                    <Link href="/">
                        <a className="flex items-center hover:bg-gray-300 active:bg-gray-300 p-4 rounded-full">
                            <HomeIcon />
                        </a>
                    </Link>
                    <Link href="/tasks">
                        <a className="flex items-center hover:bg-gray-300 active:bg-gray-300 p-4 rounded-full">
                            <AssignmentTurnedInIcon />
                        </a>
                    </Link>
                    <a
                        onClick={() => console.log("Logout")}
                        className="flex items-center hover:bg-gray-300 active:bg-gray-300 p-4 rounded-full"
                    >
                        <ExitToAppIcon />
                    </a>
                </div>
                <span className="flex items-center text-blue-600 font-bold">
                    {date}
                </span>
            </nav>

            <div className="flex-grow overflow-y-scroll sm:mt-16 w-full p-8">
                {children}
            </div>

            <nav
                className="flex w-screen justify-evenly items-center h-16 py-4 px-8 z-10 shadow-reverse
             sm:hidden bg-white"
            >
                <Link href="/">
                    <a className="flex items-center hover:bg-gray-300 active:bg-gray-300 p-4 rounded-full">
                        <HomeIcon />
                    </a>
                </Link>
                <Link href="/tasks">
                    <a className="flex items-center hover:bg-gray-300 active:bg-gray-300 p-4 rounded-full">
                        <AssignmentTurnedInIcon />
                    </a>
                </Link>
                <a
                    onClick={() => console.log("Logout")}
                    className="flex items-center hover:bg-gray-300 active:bg-gray-300 p-4 rounded-full"
                >
                    <ExitToAppIcon />
                </a>
            </nav>
        </div>
    );
};
