import React from "react";
import Link from "next/link";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Image from "next/image";
import { useAuth } from "../../contexts/useAuth";
import moment from "moment";
import { motion } from "framer-motion";

const TopBar = () => {
    const { user, setIsLogout } = useAuth();
    const date = moment().locale("nl-be").format("DD-MM-YYYY");
    return (
        <nav className="flex bg-white justify-between items-center sm:fixed top-0 w-full h-16 py-4 px-8 z-10 shadow-lg">
            <Image src="/icon.png" alt="Planner Logo" width={50} height={50} />
            {user.username && (
                <div className="hidden sm:flex sm:justify-evenly sm:flex-grow sm:w-auto">
                    <Link href="/">
                        <motion.a
                            whileTap={{ scale: 0.8 }}
                            className="flex items-center hover:bg-gray-300 p-4 rounded-full"
                        >
                            <HomeIcon />
                        </motion.a>
                    </Link>
                    <Link href="/tasks">
                        <motion.a
                            whileTap={{ scale: 0.8 }}
                            className="flex items-center hover:bg-gray-300 p-4 rounded-full"
                        >
                            <AssignmentTurnedInIcon />
                        </motion.a>
                    </Link>
                    <motion.a
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setIsLogout(true)}
                        className="flex items-center hover:bg-gray-300 p-4 rounded-full"
                    >
                        <ExitToAppIcon />
                    </motion.a>
                </div>
            )}
            <span className="flex items-center text-blue-600 font-bold">
                {date} | {user.username}
            </span>
        </nav>
    );
};

export default TopBar;
