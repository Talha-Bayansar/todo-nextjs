import React from "react";
import Link from "next/link";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useAuth } from "../../contexts/useAuth";

const BottomBar = () => {
    const { signOut } = useAuth();
    return (
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
                onClick={() => signOut()}
                className="flex items-center hover:bg-gray-300 active:bg-gray-300 p-4 rounded-full"
            >
                <ExitToAppIcon />
            </a>
        </nav>
    );
};

export default BottomBar;
