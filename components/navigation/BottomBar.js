import React from "react";
import Link from "next/link";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useAuth } from "../../contexts/useAuth";
import { motion } from "framer-motion";

const BottomBar = () => {
    const { setIsLogout, user } = useAuth();
    return (
        <nav
            className="flex w-screen justify-evenly items-center h-16 py-4 px-8 z-10 shadow-reverse
             sm:hidden bg-white"
        >
            {user.username && (
                <>
                    <Link href="/">
                        <motion.a
                            whileTap={{ scale: 0.8 }}
                            className="flex items-center p-4 rounded-full"
                        >
                            <HomeIcon />
                        </motion.a>
                    </Link>
                    <Link href="/tasks">
                        <motion.a
                            whileTap={{ scale: 0.8 }}
                            className="flex items-center p-4 rounded-full"
                        >
                            <AssignmentTurnedInIcon />
                        </motion.a>
                    </Link>
                    <motion.a
                        whileTap={{ scale: 0.8 }}
                        onClick={() => setIsLogout(true)}
                        className="flex items-center p-4 rounded-full"
                    >
                        <ExitToAppIcon />
                    </motion.a>
                </>
            )}
        </nav>
    );
};

export default BottomBar;
