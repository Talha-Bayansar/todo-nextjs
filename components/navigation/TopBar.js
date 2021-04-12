import React from "react";
import Link from "next/link";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Image from "next/image";
import { useAuth } from "../../contexts/useAuth";
import moment from "moment";

const TopBar = () => {
    const { user, signOut } = useAuth();
    console.log(user);
    const date = moment().locale("nl-be").format("DD-MM-YYYY");
    return (
        <nav className="flex bg-white justify-between items-center sm:fixed top-0 w-full h-16 py-4 px-8 z-10 shadow-lg">
            <Image src="/icon.png" alt="Planner Logo" width={50} height={50} />
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
                    onClick={() => signOut()}
                    className="flex items-center hover:bg-gray-300 active:bg-gray-300 p-4 rounded-full"
                >
                    <ExitToAppIcon />
                </a>
            </div>
            <span className="flex items-center text-blue-600 font-bold">
                {date} | {user.username}
            </span>
        </nav>
    );
};

export default TopBar;
