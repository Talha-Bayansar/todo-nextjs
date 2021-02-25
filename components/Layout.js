import React, { useEffect, useState } from "react";
import Link from "next/link";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

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
        <div className="flex flex-col items-center w-full">
            <nav className="flex bg-gray-200 justify-between items-center fixed top-0 w-full h-16 px-8 z-10 shadow-lg">
                <h1 className="text-3xl font-bold hidden sm:block">Logo</h1>
                <div className="flex justify-evenly w-full sm:w-auto">
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
                    <Link href="/tasks">
                        <a className="flex items-center hover:bg-gray-300 active:bg-gray-300 p-4 rounded-full">
                            <ExitToAppIcon />
                        </a>
                    </Link>
                    <span className="flex items-center px-4 text-blue-600 font-bold">
                        {date}
                    </span>
                </div>
            </nav>
            <div className="mt-16 w-full p-8">{children}</div>
        </div>
    );
};
